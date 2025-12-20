import { API_BASE_URL } from "../config/api";
import { requestJson } from "./http";

// Update a user via Platzi Fake Store API
// Docs: https://fakeapi.platzi.com/en/rest/users/#update-a-user
export function updateUser({ id, payload }) {
  if (!id) {
    throw new Error("User id is required to update profile");
  }

  return requestJson(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
