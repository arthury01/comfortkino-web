import { StepsData } from "./steps"

export interface AuthData extends StepsData {
    phone?: string
    scenario?: string
    registered?: boolean
}
