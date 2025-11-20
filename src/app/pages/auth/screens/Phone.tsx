"use client"

import { useState } from "react"
import { StepProps } from "../../../../components/Stepper"
import { AuthData } from "../../../../types/steps/auth"
import { useAuth } from "../../../../hooks/useAuth"

export default function Phone({ navigate }: StepProps<AuthData>) {
    const { getSms, loading } = useAuth()
    const [phone, setPhone] = useState("")
    const disabled = phone.length < 10 || loading

    const handleNextStep = async (phone: string, scenario: string) => {
        const registered = await getSms(phone, scenario)
        navigate(scenario === "telegram" ? "telegram" : "code", { phone, scenario, registered })
    }

    return (
        <div className="flex flex-col gap-4 px-16 py-8">
            <input
                onChange={e => setPhone(e.target.value)}
                type="tel"
                placeholder="Введите номер телефона"
                className="w-full rounded-md border border-gray-300 p-2 text-center"
            />
            <div className="flex flex-col gap-2">
                <button
                    disabled={disabled}
                    onClick={() => handleNextStep(phone, "login")}
                    className={`bg-accent w-full cursor-pointer rounded-md text-white ${disabled ? "opacity-50" : ""} p-2`}>
                    Далее
                </button>
                {/* <button
                    disabled={disabled}
                    onClick={() => handleNextStep(phone, "telegram")}
                    className={`bg-accent w-full cursor-pointer rounded-md text-white ${disabled ? "opacity-50" : ""} p-2`}>
                    Телеграм
                </button> */}
            </div>
        </div>
    )
}
