import { useEffect, useRef } from "react"
import { useRequest } from "../../hooks/useRequest"
import { userStore } from "../../store/userStore"

export default function TokenInit() {
    const { requestData } = useRequest()
    const { setDeviceToken } = userStore()
    const initialized = useRef(false)

    useEffect(() => {
        if (initialized.current) return
        initialized.current = true

        requestData<{ token: string }>({
            type: "GET",
            path: "devicetoken",
            disableError: true
        }).then(res => {
            if (res.status === "success") setDeviceToken(res.data.token)
        })
    }, [])

    return null
}
