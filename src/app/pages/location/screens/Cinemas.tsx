import { useNavigate } from "react-router-dom"
import { StepProps } from "../../../../components/Stepper"
import { LocationData } from "../../../../types/steps/location"
import { useRequest } from "../../../../hooks/useRequest"
import { appStore } from "../../../../store/appStore"
import { useEffect, useState } from "react"
import { Cinema } from "../../../../types/entities/cinema"
import { Skeleton } from "../../../../components/Skeleton"
import { userStore } from "../../../../store/userStore"

export default function Cinemas({ params }: StepProps<LocationData>) {
    const { newCity } = params
    const router = useNavigate()
    const { request } = useRequest()
    const { setLocation, cinema, city } = appStore()
    const { user, clearAuth } = userStore()

    const [cinemas, setCinemas] = useState<Cinema[]>([])
    const [loading, setLoading] = useState(false)

    const getCinemas = async () => {
        try {
            setLoading(true)
            const data = await request<Cinema[]>("GET", "cinema")
            const filteredCinemas = data.filter(cinema => cinema.city_id === newCity?.id)
            setCinemas(filteredCinemas)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCinemas()
    }, [])

    const selectCinema = (cinema: Cinema) => {
        if (newCity?.id !== city.id && user) {
            clearAuth()
        }
        newCity && setLocation({ cinema, city: newCity })
        router(-1)
    }

    return (
        <div className="flex h-full items-center justify-center md:h-auto">
            <div className="flex max-h-full w-full flex-col overflow-auto px-6 py-6 md:w-[300px] md:px-0">
                {loading ? (
                    <Skeleton lines={8} itemClassName="w-full h-[50px]" />
                ) : (
                    <div className="flex flex-col gap-2">
                        {cinemas.map(cinemaItem => (
                            <div
                                className={`${cinemaItem.id === cinema.id ? "bg-accent" : "bg-text/15"} flex h-[50px] items-center justify-center rounded-[7px] text-[16px]/[21px] font-semibold tracking-[0.32px] hover:cursor-pointer`}
                                key={cinemaItem.id}
                                onClick={() => selectCinema(cinemaItem)}>
                                {cinemaItem.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
