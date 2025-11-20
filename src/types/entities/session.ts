type SeatType = {
    type: string
    text: string
    color: string
}

type Price = {
    slug: string
    name: string
    price: number
    color: string
}

export type Place = {
    color: string
    height: number
    id: number
    image: string | null
    my: boolean
    place: number
    price: number
    row: number
    status: boolean
    type: number
    width: number
    x: number
    y: number
}

type Object = {
    height: number
    name: string
    slug: string
    width: number
    x: number
    y: number
}

type Level = {
    name: string
    width: number
    height: number
    objects: Object[]
    places: Place[]
}

type Hall = {
    name: string
    levels: Level[]
}

export type Session = {
    cinema_name: string
    datetime: string
    datetime_at: string
    description: string
    film_name: string
    format: string
    hall: Hall
    messages: string[]
    prices: Price[]
    captions: {
        title: string
        types: SeatType[]
    }
    sale: boolean
    sale_message: string | null
}
