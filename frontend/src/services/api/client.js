import { ApiError } from "./errors";
import { mockRequest } from "./mock/adapter";

// The only thing that changes when the real backend is ready:
// set VITE_API_BASE_URL in .env (e.g. http://localhost:5000/api).
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
export const isMockApi = !BASE_URL;

// Filled in by <ApiAuthBridge /> once Clerk has loaded.
const session = { getToken: null, user: null };

export function setApiSession({ getToken, user }) {
  session.getToken = getToken;
  session.user = user;
}

function cleanQuery(query = {}) {
  return Object.fromEntries(
    Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
}

async function request(method, path, { query, body } = {}) {
  const params = cleanQuery(query);

  if (isMockApi) {
    return mockRequest({ method, path, query: params, body, me: session.user });
  }

  const token = await session.getToken?.();
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}${path}${qs ? `?${qs}` : ""}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.message || res.statusText, data?.errors);
  // Backend responses look like { success, data, message } — components only need `data`.
  return data && typeof data === "object" && "success" in data ? data.data : data;
}

export const api = {
  get: (path, query) => request("GET", path, { query }),
  post: (path, body) => request("POST", path, { body }),
  patch: (path, body) => request("PATCH", path, { body }),
  delete: (path) => request("DELETE", path),
};
