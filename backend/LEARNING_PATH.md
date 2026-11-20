# Volunteer backend — learning path

Work through the steps **in order**. Each step builds on the one before it, and each ends with
something you can test. Don't move on until the tests at the end of a step pass.

Every file starts with a comment saying what it does and what it connects to. Inside each function:
- `// TODO:` lists what to write, step by step
- `// HINT:` points to the method or idea to use, plus keywords to search

When a file is done, paste it to Claude for a review.

---

## Step 0 — Setup (≈ 30 min)

1. `cd backend && npm install` (already done once)
2. `cp .env.example .env`
3. Create accounts and copy the keys into `.env`:
   - **MongoDB Atlas**: free M0 cluster → Database Access (create a user) → Network Access (add your IP) → Connect → Drivers
   - **Clerk**: same app as the frontend → Configure → API Keys (publishable **and** secret)
   - **Cloudinary**: free account → Dashboard
4. Install a REST client: **Thunder Client** (VS Code extension) or **Postman**.

---

## Step 1 — Boot the server (easiest)

Files, in this order:
1. `src/config/env.js` — Zod schema for env vars
2. `src/utils/ApiError.js`
3. `src/utils/apiResponse.js`
4. `src/middlewares/notFound.js`
5. `src/middlewares/errorHandler.js`
6. `src/middlewares/rateLimiter.js` (only `apiLimiter` for now)
7. `src/app.js` — middleware order + `/api/health`
8. `src/server.js` — skip `connectDB` and `initSocket` for now (comment them out)

**Test**
```
npm run dev
GET http://localhost:5000/api/health
→ 200 { "success": true, "data": { "status": "ok" }, "message": "OK" }

GET http://localhost:5000/api/nope
→ 404 { "success": false, "data": null, "message": "Route not found: GET /api/nope" }
```
Also try deleting `PORT` from `.env`: the server should refuse to start and tell you why.

---

## Step 2 — Database + models

1. `src/config/db.js`, then turn `connectDB()` back on in `server.js`
2. `src/models/User.js`
3. `src/models/Mission.js` (don't forget the **2dsphere** index)
4. `src/utils/geo.js`
5. The other models: Message, Notification, Rating, Report, StudyProfile

**Test**
- The console shows `MongoDB connected: <host>`.
- In Atlas → Browse Collections, the collections appear after the first insert.
- Atlas → Collection → Indexes: `missions` has a `location.point_2dsphere` index.
- Quick check: a temporary script that runs `User.create({...})` with a bad email or missing name should fail validation.

---

## Step 3 — Auth (Clerk)

1. `src/services/user.service.js` → `mapClerkUser`, `upsertFromClerk`, `findOrCreateFromClerk`, `softDeleteByClerkId`
2. `src/controllers/webhook.controller.js` + `src/routes/webhook.routes.js`
3. `src/middlewares/auth.js` → `requireUser`, `requireAdmin`
4. `src/validators/common.validator.js`, `src/middlewares/validate.js`
5. `src/routes/user.routes.js` (only `GET /me` for now), `src/controllers/user.controller.js` → `getMe`, `src/routes/index.js`

**Get a token for testing**: sign in on the frontend, then in the browser console run:
```js
await window.Clerk.session.getToken()
```
Tokens expire after about 60 s, so fetch a new one when you get a 401.

**Test**
```
GET /api/users/me                              (no header)  → 401 "Please sign in to continue."
GET /api/users/me   Authorization: Bearer <token>           → 200 your user (it now exists in Atlas)
```
Webhook test: run `ngrok http 5000` and add `https://<ngrok-url>/api/webhooks/clerk` in Clerk → Webhooks.
Click **Send example** for `user.updated` and the user should update in Atlas.
Send a request with a wrong signature and you should get 400.

---

## Step 4 — Missions (the big one)

1. `src/utils/pagination.js`, `src/utils/dates.js`, `src/utils/serialize.js`
2. `src/validators/mission.validator.js`
3. `src/services/mission.service.js`, in this order:
   `buildMissionFilter` → `createMission` → `getMissionById` → `listMissions` (without geo first, then add `$geoNear`) → `joinMission` → `leaveMission` → `updateMission` → `cancelMission`
4. `src/controllers/mission.controller.js`, `src/routes/mission.routes.js`

**Test**
```
POST /api/missions
{
  "title": "Ulsoor Lake shoreline cleanup",
  "category": "volunteer",
  "description": "Gloves and bags provided.",
  "location": { "name": "Ulsoor Lake, Boat Club gate", "area": "Halasuru", "city": "Bengaluru", "lat": 12.983, "lng": 77.62 },
  "startsAt": "2026-12-05T07:00:00+05:30",
  "durationHours": 3,
  "spotsTotal": 25,
  "requirements": ["Closed-toe shoes"],
  "tags": ["Environment"]
}
→ 201, data.id exists, data.membersCount = 1, data.isHost = true

POST /api/missions   { "title": "Hi" }                                 → 422 with errors[]
GET  /api/missions?lat=12.9719&lng=77.6412&distance=10                  → items sorted by distanceKm
GET  /api/missions?lat=12.9719&lng=77.6412&distance=2                   → fewer items
GET  /api/missions?category=study&date=week&q=dsa                       → filtered
GET  /api/missions?page=2&limit=5                                       → meta.page = 2
GET  /api/missions/abc                                                  → 422 (invalid id), not 500
POST /api/missions/:id/join   (as a 2nd user)                           → isMember = true
POST /api/missions/:id/join   when full                                 → 409 "Sorry, this mission just filled up."
POST /api/missions/:id/leave  (as host)                                 → 409
```

🎉 **Milestone:** in `frontend/.env` set `VITE_API_BASE_URL=http://localhost:5000/api` and restart Vite.
The Home and Mission details screens now run on your backend.

---

## Step 5 — Chat (Socket.io)

1. `src/validators/chat.validator.js`
2. `src/services/chat.service.js`
3. `src/controllers/chat.controller.js`, `src/routes/chat.routes.js`
4. `src/sockets/index.js`, `src/sockets/chat.socket.js`, then turn `initSocket` back on in `server.js`
5. Add system messages ("Rohan joined") to `joinMission`/`leaveMission`

**Test**
```
GET /api/missions/:id/messages                  (as a member)     → 200 []
GET /api/missions/:id/messages                  (as a non-member) → 403
```
Socket test: Postman → New → **Socket.IO** request → `http://localhost:5000`, with `auth` = `{ "token": "<token>" }`.
Emit `chat:join` `{ "missionId": "…" }`, then `message:send` `{ "missionId": "…", "text": "Hi!" }`.
Open a second Postman tab as another member and it should receive `message:new`.
Connecting without a token should be rejected.

---

## Step 6 — The rest

Do these in any order:

| Feature | Files | Quick test |
|---|---|---|
| Notifications | `notification.service.js`, `notification.controller.js`, `notification.routes.js` | Join someone's mission, then the host sees it at `GET /api/notifications` and receives the `notification:new` socket event |
| Report / block | `report.validator.js`, `report.service.js` (createReport), `report.controller.js`, `report.routes.js`, `user.service.js` (blockUser, getHiddenUserIds) | `POST /api/reports` → 201; `POST /api/users/:id/block` → their missions disappear from `GET /api/missions`; the 11th report in an hour → 429 |
| Profile + stats | `user.validator.js`, the rest of `user.service.js`/`user.controller.js` | `PATCH /api/users/me {"bio":"Hi"}` works; `{"role":"admin"}` → 422 |
| Check-in | `mission.service.js` → `checkIn` | Wrong location → 409; right location within the time window → `stats.hoursContributed` goes up |
| Ratings + reliability | `rating.validator.js`, `rating.service.js`, `rating.controller.js` | Rate twice → 409; `reliability.average` changes |
| Study matching | `study.validator.js`, `study.service.js`, `study.controller.js`, `study.routes.js` | Two users with the same exam → each appears in the other's `GET /api/study/matches` |
| Uploads | `config/cloudinary.js`, `middlewares/upload.js`, `upload.service.js`, `upload.controller.js`, `upload.routes.js` | form-data `image` → 201 `{ url, publicId }`; a 10 MB file → 413; a .pdf → 400 |
| Admin | `admin.validator.js`, the rest of `report.service.js`, `admin.controller.js`, `admin.routes.js` | As a normal user → 403; set `role: "admin"` in Atlas → 200 |
| Badges + auto-complete | `user.service.js` → `evaluateBadges`, `mission.service.js` → `completeFinishedMissions` | Complete your first mission → "First mission" badge |

---

## Production checklist (before deploying)

- [ ] `helmet()` and CORS restricted to your real frontend URL
- [ ] `app.set("trust proxy", 1)` on Render/Railway
- [ ] Rate limits on all routes; stricter ones on create, report and upload
- [ ] Every route validates params, query and body with Zod
- [ ] No 500 response leaks `err.message` or a stack trace
- [ ] Indexes exist (check in Atlas) and every list endpoint is paginated
- [ ] Atlas Network Access allows only your host's IPs (not 0.0.0.0/0)
- [ ] Clerk webhook points at the production URL, with a new signing secret
- [ ] `.env` was never committed (`git log -p | grep MONGODB_URI` finds nothing)

---

## Checklist

### Step 1 — Boot
- [ ] config/env.js
- [ ] utils/ApiError.js
- [ ] utils/apiResponse.js
- [ ] middlewares/notFound.js
- [ ] middlewares/errorHandler.js
- [ ] middlewares/rateLimiter.js
- [ ] app.js
- [ ] server.js
- [ ] ✅ /api/health returns 200, unknown routes return a JSON 404

### Step 2 — Database
- [ ] config/db.js
- [ ] models/User.js
- [ ] models/Mission.js (+ 2dsphere)
- [ ] utils/geo.js
- [ ] models/Message.js
- [ ] models/Notification.js
- [ ] models/Rating.js
- [ ] models/Report.js
- [ ] models/StudyProfile.js
- [ ] ✅ Connected; indexes visible in Atlas

### Step 3 — Auth
- [ ] services/user.service.js (Clerk sync functions)
- [ ] controllers/webhook.controller.js
- [ ] routes/webhook.routes.js
- [ ] middlewares/auth.js
- [ ] validators/common.validator.js
- [ ] middlewares/validate.js
- [ ] routes/index.js + GET /users/me
- [ ] ✅ 401 without a token, 200 with one; webhook syncs users

### Step 4 — Missions
- [ ] utils/pagination.js
- [ ] utils/dates.js
- [ ] utils/serialize.js
- [ ] validators/mission.validator.js
- [ ] services/mission.service.js
- [ ] controllers/mission.controller.js
- [ ] routes/mission.routes.js
- [ ] ✅ Frontend works against the real API

### Step 5 — Chat
- [ ] validators/chat.validator.js
- [ ] services/chat.service.js
- [ ] controllers/chat.controller.js
- [ ] routes/chat.routes.js
- [ ] sockets/index.js
- [ ] sockets/chat.socket.js
- [ ] ✅ Two clients chat live; non-members blocked

### Step 6 — The rest
- [ ] Notifications
- [ ] Report + block
- [ ] Profile + impact stats
- [ ] Check-in
- [ ] Ratings + reliability
- [ ] Study matching
- [ ] Uploads (Cloudinary)
- [ ] Admin moderation
- [ ] Badges + auto-complete missions
- [ ] ✅ Production checklist done
