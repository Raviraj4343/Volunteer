/**
 * utils/serialize.js — shapes database documents into exactly what the
 * frontend expects (field names, computed fields, no private data).
 *
 * Connects to: services/mission.service.js, services/user.service.js.
 * The target shapes are defined by the mock API — read these first:
 *   frontend/src/services/api/mock/adapter.js → publicUser(), serializeMission()
 *
 * Mission shape the frontend uses:
 *   { id, title, category, description, location: { name, area, city, lat, lng },
 *     startsAt, durationHours, spotsTotal, requirements, tags, urgent, study,
 *     host, membersCount, membersPreview[4], spotsLeft, distanceKm,
 *     isMember, isHost, members? (details page only) }
 */

export function toPublicUser(user) {
  // TODO: return only safe fields: { id, name, avatarUrl, city, bio, reliability }
  // HINT: NEVER return email, clerkId, blockedUsers or role to other users.
  //       `id` = user._id.toString() (the frontend uses `id`, not `_id`).
}

export function toMissionDTO(mission, { viewerId, distanceKm = null, includeMembers = false } = {}) {
  // TODO:
  //   1. Convert location.point back to { lat, lng } (utils/geo.js → fromPoint)
  //   2. host = toPublicUser(mission.host)  (host must be populated)
  //   3. membersCount = mission.members.length; spotsLeft = max(spotsTotal - membersCount, 0)
  //   4. membersPreview = first 4 members → toPublicUser
  //   5. isMember / isHost: compare ids as strings (ObjectId === ObjectId is always false!)
  //      HINT: use .equals() or String(a) === String(b)
  //   6. if includeMembers → members = all members → toPublicUser
  //   7. return the object described at the top of this file
  // HINT: "DTO" = Data Transfer Object: what you send, not what you store.
}
