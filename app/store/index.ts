import { create } from 'zustand'
import { User } from '../db/schema'
import { persist, createJSONStorage } from 'zustand/middleware'


type UserState = {
  user: Omit<User, "createdAt"> | undefined,
  setUser: (user: Omit<User, "createdAt">
  ) => void
}

export const useUserStore = create<UserState>()(persist((set) => ({
  user: undefined,
  setUser: (user) => set({ user })
}), {
  name: "user-store",
  storage: createJSONStorage(() => localStorage),
}))
