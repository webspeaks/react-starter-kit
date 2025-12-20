import { API_BASE_URL } from "./config";
import { requestJson } from "./http";

export function login({ email, password }) {
  return requestJson("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return requestJson("/api/logout", {
    method: "POST",
  });
}

export function registerUser(payload) {
  return requestJson(`${API_BASE_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
