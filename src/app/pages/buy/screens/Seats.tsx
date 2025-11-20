import { useLocation, useNavigate, useRouteError } from "react-router-dom"
import { StepProps } from "../../../../components/Stepper"
import { BuyData, PayInfo } from "../../../../types/steps/buy"
import { useRequest } from "../../../../hooks/useRequest"
import { appStore } from "../../../../store/appStore"
import { userStore } from "../../../../store/userStore"
import { useEffect, useState } from "react"
import { Place, Session } from "../../../../types/entities/session"
import Loader from "../../../../components/Loader"

export default function Seats({ navigate, modalSize }: StepProps<BuyData>) {
    const router = useNavigate()
    const { request } = useRequest()
    const { cinema } = appStore()
    const { user } = userStore()
    const [loading, setLoading] = useState(false)
    const [selectedSeats, setSelectedSeats] = useState<Place[]>([])
    const [sessionData, setSessionData] = useState<Session | null>(null)
    const level = sessionData?.hall?.levels?.[0]
    const { objects = [], places = [], width = 0, height = 0 } = level ?? {}
    const safeModalSize = modalSize ?? { width: 0, height: 0 }
    const { width: modalW } = safeModalSize
    const location = useLocation()
    const { state } = location
    const { session, movieData } = state

    const getSeats = async () => {
        setLoading(true)
        setSelectedSeats([])
        const data = await request("GET", `cinema/${cinema.id}/session/${session.id}?order_id=`)
        setSessionData(data)
        setLoading(false)
    }

    const handleSeatPress = (place: Place) => {
        setSelectedSeats(prevSeats => {
            if (prevSeats.includes(place)) {
                return prevSeats.filter(seat => seat.id !== place.id)
            } else if (prevSeats.length < 8) {
                return [...prevSeats, place]
            } else {
                alert("Достигнут максимум количества билетов за одну покупку")
                return prevSeats
            }
        })
    }

    const payInfo: PayInfo = {
        selectedSeats,
        film_name: sessionData?.film_name,
        description: sessionData?.description,
        format: sessionData?.format,
        totalPrice: selectedSeats.reduce((accumulator, seat) => accumulator + seat.price, 0),
        selectedSession: session?.id,
        privileges: movieData.privileges,
        poster: movieData.poster,
        poster_mobile: movieData.poster_mobile,
        other: {
            cinemaName: sessionData?.cinema_name,
            hallNumber: sessionData?.hall.name,
            date: sessionData?.datetime
                ? new Date(sessionData.datetime.replace(" ", "T")).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
                : null,
            time: sessionData?.datetime.slice(11, 16)
        }
    }

    const submit = async () => {
        if (user?.token) {
            // const data = await request("GET", `cinema/${cinema.id}/session/${params.session.id}/modal`)
            // popupData ? openModal("popup", { popupData, action: handler }) :
            navigate("pay", { payInfo })
        } else {
            router("/auth", { state })
        }
    }

    useEffect(() => {
        getSeats()
    }, [])

    if (loading) return <Loader />

    const scale = modalW - 80 < width ? (modalW - 80) / width : width / (modalW - 80)

    return (
        <div className="flex flex-col items-center justify-center gap-5 p-10">
            <div className="relative justify-center" style={{ width: width, height: height, transform: `scale(${scale})` }}>
                {places?.map((place, index) => {
                    const isSelected = selectedSeats.includes(place)
                    return (
                        <button
                            key={index}
                            disabled={!place.status}
                            style={{
                                height: place.height,
                                width: place.width,
                                left: place.x,
                                top: place.y,
                                backgroundColor: isSelected || place.my ? "#E4206B" : place.color,
                                opacity: place.status ? 1 : 0.5
                            }}
                            className="absolute flex cursor-pointer items-center justify-center rounded-md"
                            onClick={() => handleSeatPress(place)}>
                            <div className="text-sm font-medium" style={{ opacity: place.status ? 0.8 : 0.5 }}>
                                {place.place}
                            </div>
                        </button>
                    )
                })}
                {objects?.map((object, index) => {
                    const isScreen = object.slug === "screen"
                    return (
                        <div
                            key={index}
                            style={{
                                height: object.height,
                                width: object.width,
                                left: object.x,
                                top: object.y,
                                ...(isScreen && {
                                    backgroundColor: "#fff",
                                    borderRadius: 20,
                                    height: 10,
                                    boxShadow: "0px 10px 20px rgba(255, 255, 255, 1)"
                                })
                            }}
                            className="absolute flex items-center justify-center rounded-md">
                            {!isScreen && <div className="text-sm font-medium">{object.name}</div>}
                        </div>
                    )
                })}
            </div>
            <button
                disabled={loading || selectedSeats.length === 0}
                onClick={() => submit()}
                className={`bg-accent w-full cursor-pointer rounded-md text-white ${loading || selectedSeats.length === 0 ? "opacity-50" : ""} p-2`}>
                Продолжить
            </button>
        </div>
    )
}
