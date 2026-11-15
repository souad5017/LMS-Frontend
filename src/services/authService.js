
import { apiRequest } from "./api";

export function login(credentials) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function getProfile(token) {
  return apiRequest("/api/profiles/me", {}, token);
}
