export type MovieSession = {
    id: number
    time: string
    format: string
    disabled: boolean
    price: string
    price_name: string
    started: boolean
    date: string
    sale: boolean
    datetime: number
    datetime_at: string
    price_min: number
    price_max: number
}

export type Movie = {
    id: number
    age: string
    favourites: boolean
    name: string
    trailer: string | null
    genres: string
    rent: string | null
    privileges: {
        invitational: boolean
        discount: boolean
        pushkin_card: boolean
        child_place: boolean
    }
    poster: {
        big: string
        small: string
    }
    poster_mobile: {
        big: string
        small: string
    }
    sessions: MovieSession[]
}
