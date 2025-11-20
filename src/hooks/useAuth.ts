import { appStore } from "../store/appStore"
import { userStore } from "../store/userStore"
import { useRequest } from "./useRequest"
import { useState } from "react"

export const useAuth = () => {
    const { request } = useRequest()
    const { city } = appStore()
    const { deviceToken } = userStore()
    const [loading, setLoading] = useState(false)

    const checkRegistration = async (phone: string) => {
        const data = await request("GET", `check?phone=${phone}&city_id=${city.id}`)
        return data
    }

    const getSms = async (phone: string, scenario: string) => {
        try {
            setLoading(true)
            const registered = await checkRegistration(phone)
            const data = await request("POST", registered ? "login/code" : "registration/code", {
                phone: `+7${phone}`,
                city_id: city.id,
                token: deviceToken
            })
            return registered
        } finally {
            setLoading(false)
        }
    }

    return { getSms, loading }
}
