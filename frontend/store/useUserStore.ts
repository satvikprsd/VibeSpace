import { de } from "zod/locales";
import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";

export interface User {
  _id: string
  username: string
  name: string
  email: string
  dob: string | null
  createdAt: string
  activity: string
  avatar: string
  friends?: string[]
  githubId?: string
  githubProfileUrl?: string
  githubUsername?: string
  servers?: Array<{
    _id: string;
    name?: string;
    description?: string;
  }>
  status: 'Online' | 'Offline' | 'Idle' | 'Dnd'
}

interface UserState {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isLoggedIn: false,
                setUser: (user: User | null) => set({user}),
                setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn}),
                clearUser: () => set({user: null}),
            }),
            {
                name: "user-storage",
            }
        )
    )
);