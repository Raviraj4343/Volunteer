import { isSaturday, isSunday, isToday, isWithinInterval, endOfWeek, startOfDay, nextSaturday, endOfDay, addDays } from "date-fns";
import { db, persist } from "./db";
import { distanceKm } from "@/lib/geo";
import { ApiError } from "../errors";

// The mock adapter mimics the REST API the real backend will expose.
// Each route receives { params, query, body, me } and returns JSON.

const LATENCY = [250, 650];
const delay = () => new Promise((r) => setTimeout(r, LATENCY[0] + Math.random() * (LATENCY[1] - LATENCY[0])));

function findUser(id) {
  return db.users.find((u) => u.id === id);
}

function publicUser(user) {
  if (!user) return null;
  const { id, name, avatarUrl = null, city, bio, reliability } = user;
  return { id, name, avatarUrl, city, bio, reliability };
}

function upsertMe(me) {
  if (!me) throw new ApiError(401, "Please sign in to continue.");
  let user = findUser(me.id);
  if (!user) {
    user = { id: me.id, name: me.name, avatarUrl: me.avatarUrl, city: "Bengaluru", bio: "", reliability: 5, joinedAt: new Date().toISOString() };
    db.users.push(user);
  } else {
    Object.assign(user, { name: me.name, avatarUrl: me.avatarUrl });
  }
  return user;
}

function matchesDate(mission, filter) {
  const date = new Date(mission.startsAt);
  const now = new Date();
  switch (filter) {
    case "today":
      return isToday(date);
    case "week":
      return isWithinInterval(date, { start: startOfDay(now), end: endOfWeek(now, { weekStartsOn: 1 }) });
    case "weekend": {
      if (isSunday(now)) return isWithinInterval(date, { start: startOfDay(now), end: endOfDay(now) });
      const saturday = isSaturday(now) ? now : nextSaturday(now);
      return isWithinInterval(date, { start: startOfDay(saturday), end: endOfDay(addDays(saturday, 1)) });
    }
    default:
      return true;
  }
}

function serializeMission(mission, { me, origin } = {}) {
  const members = mission.memberIds.map(findUser).filter(Boolean);
  return {
    ...mission,
    host: publicUser(findUser(mission.hostId)),
    membersCount: members.length,
    membersPreview: members.slice(0, 4).map(publicUser),
    spotsLeft: Math.max(mission.spotsTotal - members.length, 0),
    distanceKm: origin ? distanceKm(origin, mission.location) : null,
    isMember: me ? mission.memberIds.includes(me.id) : false,
    isHost: me ? mission.hostId === me.id : false,
  };
}

function getMissionOr404(id) {
  const mission = db.missions.find((m) => m.id === id);
  if (!mission) throw new ApiError(404, "This mission doesn't exist or was removed.");
  return mission;
}

const routes = [
  {
    method: "GET",
    path: "/missions",
    handler: ({ query, me }) => {
      const origin = query.lat ? { lat: Number(query.lat), lng: Number(query.lng) } : null;
      const q = (query.q || "").trim().toLowerCase();
      const maxKm = query.distance && query.distance !== "any" ? Number(query.distance) : null;
      const blocked = new Set(db.blocked);

      const items = db.missions
        .filter((m) => new Date(m.startsAt) > new Date(Date.now() - 1000 * 60 * 60 * 2))
        .filter((m) => !blocked.has(m.hostId))
        .filter((m) => !query.category || query.category === "all" || m.category === query.category)
        .filter((m) => matchesDate(m, query.date))
        .filter((m) => !q || `${m.title} ${m.description} ${m.location.area} ${m.tags.join(" ")}`.toLowerCase().includes(q))
        .map((m) => serializeMission(m, { me, origin }))
        .filter((m) => maxKm == null || m.distanceKm == null || m.distanceKm <= maxKm)
        .sort((a, b) => {
          if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
          if (a.distanceKm != null && b.distanceKm != null) return a.distanceKm - b.distanceKm;
          return new Date(a.startsAt) - new Date(b.startsAt);
        });

      return { items, total: items.length };
    },
  },
  {
    method: "GET",
    path: "/missions/:id",
    handler: ({ params, query, me }) => {
      const mission = getMissionOr404(params.id);
      const origin = query.lat ? { lat: Number(query.lat), lng: Number(query.lng) } : null;
      return {
        ...serializeMission(mission, { me, origin }),
        members: mission.memberIds.map(findUser).filter(Boolean).map(publicUser),
      };
    },
  },
  {
    method: "POST",
    path: "/missions",
    handler: ({ body, me }) => {
      const user = upsertMe(me);
      if (!body?.title?.trim()) throw new ApiError(422, "Please give your mission a title.");
      const mission = {
        id: `m_${Date.now().toString(36)}`,
        title: body.title.trim(),
        category: body.category,
        description: body.description?.trim() || "",
        location: body.location,
        startsAt: body.startsAt,
        durationHours: Number(body.durationHours) || 1,
        spotsTotal: Number(body.spotsTotal) || 2,
        hostId: user.id,
        memberIds: [user.id],
        requirements: body.requirements || [],
        tags: body.tags || [],
        urgent: Boolean(body.urgent),
        study: body.study,
        createdAt: new Date().toISOString(),
      };
      db.missions.unshift(mission);
      persist();
      return serializeMission(mission, { me });
    },
  },
  {
    method: "POST",
    path: "/missions/:id/join",
    handler: ({ params, me }) => {
      const user = upsertMe(me);
      const mission = getMissionOr404(params.id);
      if (!mission.memberIds.includes(user.id)) {
        if (mission.memberIds.length >= mission.spotsTotal) throw new ApiError(409, "Sorry, this mission just filled up.");
        mission.memberIds.push(user.id);
        persist();
      }
      return serializeMission(mission, { me });
    },
  },
  {
    method: "POST",
    path: "/missions/:id/leave",
    handler: ({ params, me }) => {
      const user = upsertMe(me);
      const mission = getMissionOr404(params.id);
      if (mission.hostId === user.id) throw new ApiError(409, "Hosts can't leave their own mission. Cancel it instead.");
      mission.memberIds = mission.memberIds.filter((id) => id !== user.id);
      persist();
      return serializeMission(mission, { me });
    },
  },
  {
    method: "POST",
    path: "/reports",
    handler: ({ body, me }) => {
      upsertMe(me);
      db.reports.push({ ...body, reporterId: me.id, createdAt: new Date().toISOString() });
      persist();
      return { ok: true };
    },
  },
  {
    method: "POST",
    path: "/users/:id/block",
    handler: ({ params, me }) => {
      upsertMe(me);
      if (!db.blocked.includes(params.id)) db.blocked.push(params.id);
      persist();
      return { ok: true };
    },
  },
];

function matchRoute(method, pathname) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const keys = [];
    const pattern = new RegExp(
      "^" + route.path.replace(/:(\w+)/g, (_, key) => (keys.push(key), "([^/]+)")) + "/?$"
    );
    const match = pathname.match(pattern);
    if (match) {
      const params = Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(match[i + 1])]));
      return { route, params };
    }
  }
  return null;
}

export async function mockRequest({ method, path, query, body, me }) {
  await delay();
  const found = matchRoute(method, path);
  if (!found) throw new ApiError(404, `Mock route not found: ${method} ${path}`);
  // Return a deep copy so callers can't mutate the mock DB by accident.
  return structuredClone(found.route.handler({ params: found.params, query, body, me }));
}
