import { useMutation } from "@tanstack/react-query";

import { login, logout, registerUser } from "../api/auth";

export const authKeys = {
  all: ["auth"],
};

export function useLoginMutation(options) {
  return useMutation({
    mutationFn: login,
    ...options,
  });
}

export function useLogoutMutation(options) {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
}

export function useRegisterMutation(options) {
  return useMutation({
    mutationFn: registerUser,
    ...options,
  });
}
