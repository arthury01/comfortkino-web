import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User } from "../types/entities/user"

type UserState = {
    user: User | null
    deviceToken: string | null
}

type UserActions = {
    setDeviceToken: (deviceToken: string | null) => void
    setUser: (user: User | null) => void
    clearAuth: () => void
    getToken: () => string | null
}

export const userStore = create<UserState & UserActions>()(
    persist(
        (set, get) => ({
            user: null,
            deviceToken: null,

            setDeviceToken: token => set({ deviceToken: token }),
            setUser: user => set({ user }),
            clearAuth: () => set({ user: null, deviceToken: null }),

            getToken: () => get().user?.token ?? null
        }),
        {
            name: "user-store",
            partialize: state => ({
                user: state.user,
                deviceToken: state.deviceToken
            })
        }
    )
)
