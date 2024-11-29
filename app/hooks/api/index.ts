import { createAccount } from "@/app/services/api"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: ({ username }: { username: string }) => createAccount({ username })
  })
}
