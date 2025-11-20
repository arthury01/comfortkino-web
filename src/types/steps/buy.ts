import { Movie, MovieSession } from "../entities/movie"
import { Place } from "../entities/session"
import { StepsData } from "./steps"

export interface BuyData extends StepsData {
    session: MovieSession
    movieData: { poster: string; poster_mobile: string; privileges: Movie["privileges"] }
    payInfo: PayInfo
}

export type PayInfo = {
    selectedSeats: Place[]
    film_name?: string
    description?: string
    format?: string
    totalPrice: number
    selectedSession: string | number
    privileges: Movie["privileges"]
    poster: string
    poster_mobile: string
    other: {
        cinemaName?: string
        hallNumber?: string | number
        date: string | null
        time?: string
    }
}

export type PaymentsProps = {
    payInfo: PayInfo
    orderBody: {
        // session_id: string | number
        seats: number[]
        bonus_pay: number
        phone?: string
        email?: string
    }
    proceed?: {
        data: {
            pushkin_card: object
        }
    }
}

export type PaymentMethod = {
    type: string
    label: string
}
