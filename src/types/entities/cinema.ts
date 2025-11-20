export type Cinema = {
    id: number
    city_id: number
    name: string
    full_name?: string
    address?: string
    phone?: string
    logo: string
    geo?: {
        latitude: string
        longitude: string
    }
    domain?: string
    contact_email?: string
    card_enabled?: boolean
    link_to_comment?: string
    link_to_input?: string
    link_to_stock?: string
    link_to_help?: string
    link_to_card?: string
    link_to_invitational?: string
    link_to_discount?: string
    link_to_pushkin_card?: string
    link_to_child_place?: string
    text_to_card?: string
    text_to_return?: string
    create_places_max?: number
    hour?: {
        start: string
        end: string
        next_day: number
    }
}
