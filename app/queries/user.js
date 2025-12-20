import { useMutation } from "@tanstack/react-query";

import { updateUser } from "../api/user";

export const userKeys = {
  all: ["user"],
  detail: (id) => ["user", id],
};

export function useUpdateUserMutation(options) {
  return useMutation({
    mutationFn: updateUser,
    ...options,
  });
}
