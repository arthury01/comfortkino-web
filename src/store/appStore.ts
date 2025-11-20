import { create } from "zustand"
import { persist } from "zustand/middleware"
import { City } from "../types/entities/city"
import { Cinema } from "../types/entities/cinema"

type AppState = {
    city: City
    cinema: Cinema
}

type AppActions = {
    setLocation: (newLocation: Partial<{ city: City; cinema: Cinema }>) => void
}

type AppStore = AppState & AppActions

export const appStore = create<AppStore>()(
    persist(
        set => ({
            city: { id: 1, name: "Челябинск" },
            cinema: {
                id: 4,
                city_id: 1,
                name: "Мегаполис",
                logo: "https://static.comfortkino.ru/images/logo/cinema/800b46a4c8793abb43889932cbab33741.png"
            },

            setLocation: (newLocation: Partial<{ city: City; cinema: Cinema }>) => set(prev => ({ ...prev, ...newLocation }))
        }),
        {
            name: "app-store"
        }
    )
)
