# Volunteer — frontend

React (Vite) · React Router · Tailwind v4 + shadcn/ui · TanStack Query · Clerk · Leaflet

## Run it

```bash
cd frontend
npm install
cp .env.example .env    # then paste your Clerk publishable key
npm run dev
```

In the Clerk dashboard, enable **Email** and **Google** sign-in.

## Mock API → real backend

All data goes through `src/services/api`. When `VITE_API_BASE_URL` is empty, requests are served by
`src/services/api/mock` (seeded, localStorage-backed, with simulated latency). To use the real
backend, set:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

No component changes needed. Requests carry the Clerk session token as `Authorization: Bearer …`.

Endpoints the backend needs to implement:

| Method | Path                    | Notes                                                        |
| ------ | ----------------------- | ------------------------------------------------------------ |
| GET    | `/missions`             | query: `category, distance, date, q, lat, lng` → `{ items, total }` |
| GET    | `/missions/:id`         | query: `lat, lng` → mission + `members[]`                    |
| POST   | `/missions`             | create                                                        |
| POST   | `/missions/:id/join`    |                                                              |
| POST   | `/missions/:id/leave`   |                                                              |
| POST   | `/reports`              | `{ targetType, targetId, reason, details }`                  |
| POST   | `/users/:id/block`      |                                                              |

To reset mock data, clear the `volunteer.mockdb.v1` key in localStorage.

## Structure

```
src/
  app/            providers (Clerk, Query, Toaster) and routes
  components/
    ui/           shadcn/ui primitives (button, dialog, dropdown-menu…)
    common/       app-wide pieces (Logo, EmptyState, ErrorState, UserAvatar…)
    layout/       AppLayout, Sidebar (desktop), BottomNav (mobile)
  config/         categories, filter options, default location
  features/
    auth/         Clerk pages, route guards, API token bridge
    landing/      logged-out landing page
    missions/     Home (list + map), mission details, hooks, cards, map
    safety/       report + block dialogs
  hooks/          generic hooks (debounce, user location)
  lib/            utils, formatting, geo
  services/api/   API client, resource functions, mock adapter + seed data
```
