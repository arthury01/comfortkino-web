import { useEffect, useState } from "react"
import { useRequest } from "../../hooks/useRequest"
import { appStore } from "../../store/appStore"
import { PaymentMethod, PaymentsProps } from "../../types/steps/buy"
import Loader from "../../components/Loader"

export default function Payments({
    // payInfo,
    //  proceed,
    orderBody
}: PaymentsProps) {
    const { request } = useRequest()
    const { cinema } = appStore()
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
    const [loading, setLoading] = useState(false)

    const getPayments = async () => {
        try {
            setLoading(true)

            const base: PaymentMethod[] = [{ type: "card", label: "Банковская карта" }]

            const [sbp, sberpay] = await Promise.all([
                request("GET", `cinema/${cinema.id}/sbp`),
                request("GET", `cinema/${cinema.id}/sberpay`)
            ])

            if (sbp) base.push({ type: "sbp", label: "СБП" })
            if (sberpay) base.push({ type: "sberpay", label: "SberPay" })

            setPaymentMethods(base)
        } finally {
            setLoading(false)
        }
    }

    const selectPayment = async (type: PaymentMethod["type"]) => {
        try {
            setLoading(true)
            const resOrder = await request("POST", "user/order", orderBody)
            const resPayment = await request("POST", `user/order/${resOrder.id}/payment`, { method: type })
            window.open(resPayment.redirect_url, "_self")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPayments()
    }, [])

    if (loading) return <Loader />

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            {paymentMethods.map((item, index) => (
                <button
                    key={index}
                    disabled={loading}
                    onClick={() => selectPayment(item.type)}
                    className={`w-full cursor-pointer rounded-md bg-accent text-white ${loading ? "opacity-50" : ""} p-2`}>
                    {item.label}
                </button>
            ))}
        </div>
    )
}
