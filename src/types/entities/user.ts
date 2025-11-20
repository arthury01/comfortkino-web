type Child = {
    id: number
    user_id: number
    first_name: string
    last_name: string
    birthday: string
    gender: boolean
}

type Card = {
    id: number
    qr: boolean
    user_id: number
    number: number
    blocked: boolean
    virtual: boolean
    mask: string
    movie: {
        balance: number
        percents: number
        now_step_name: string
        now_step_sum: number
        next_step_sum: number
    }
    megaland: {
        balance: number
    }
}

export type User = {
    id: number
    email: string
    phone: string
    first_name: string
    last_name: string
    patronymic: string
    birthday: string
    gender: boolean
    password_changed: boolean
    notify: boolean
    show_image: boolean
    cards: Card[]
    childs: Child[]
    image: string | null
    token: string
    messages: number
    notification_channel: string | null
}
