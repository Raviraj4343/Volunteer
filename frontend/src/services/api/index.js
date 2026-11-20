import { api } from "./client";

export { api, isMockApi, setApiSession } from "./client";
export { ApiError, getErrorMessage } from "./errors";

// Resource-level API functions. Components never call fetch directly —
// they go through these (usually via a TanStack Query hook).

export const missionsApi = {
  list: (filters) => api.get("/missions", filters),
  get: (id, origin) => api.get(`/missions/${id}`, origin),
  create: (data) => api.post("/missions", data),
  join: (id) => api.post(`/missions/${id}/join`),
  leave: (id) => api.post(`/missions/${id}/leave`),
};

export const safetyApi = {
  report: ({ targetType, targetId, reason, details }) =>
    api.post("/reports", { targetType, targetId, reason, details }),
  blockUser: (userId) => api.post(`/users/${userId}/block`),
};
