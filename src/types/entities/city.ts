export type City = {
    id: number
    name: string
    region_id?: number
    timezone?: string
    link_to_support?: string
    public_offer_link?: string
    geo?: {
        latitude: string
        longitude: string
    }
}
