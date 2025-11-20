import { useNavigate } from "react-router-dom"
import { StepProps } from "../../../../components/Stepper"
import { AuthData } from "../../../../types/steps/auth"
import { useEffect, useState } from "react"
import { appStore } from "../../../../store/appStore"
import { useRequest } from "../../../../hooks/useRequest"
import { userStore } from "../../../../store/userStore"

export default function Code({ params, navigate }: StepProps<AuthData>) {
    const { phone, registered } = params
    const router = useNavigate()
    const { city } = appStore()
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const disabled = code.length < 4 || loading
    const { request } = useRequest()
    const { setUser } = userStore()

    const sendSms = async (code: string) => {
        try {
            setLoading(true)
            const user = await request("PUT", registered ? "login/code" : "registration/code", {
                phone: `+7${phone}`,
                city_id: city.id,
                code
            })

            if (registered) {
                setUser(user)
                router(-1)
            } else {
                navigate("email")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 px-16 py-8">
            <input
                type="tel"
                placeholder="Введите код из СМС"
                className="w-full rounded-md border border-gray-300 p-2 text-center"
                onChange={e => setCode(e.target.value)}
            />
            <button
                disabled={disabled}
                onClick={() => sendSms(code)}
                className={`bg-accent w-full cursor-pointer rounded-md text-white ${disabled ? "opacity-50" : ""} p-2`}>
                Далее
            </button>
        </div>
    )
}
