import { useEffect, useState } from "react"
import { useRequest } from "../../../../hooks/useRequest"
import { appStore } from "../../../../store/appStore"
import { StepProps } from "../../../../components/Stepper"
import { LocationData } from "../../../../types/steps/location"
import { City } from "../../../../types/entities/city"
import { Skeleton } from "../../../../components/Skeleton"

export default function Cities({ navigate }: StepProps<LocationData>) {
    const { request } = useRequest()
    const { city } = appStore()

    const [cities, setCities] = useState<City[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCities = async () => {
            try {
                setLoading(true)
                const data = await request<City[]>("GET", "city")
                setCities(data)
            } finally {
                setLoading(false)
            }
        }
        getCities()
    }, [])

    const selectCity = (newCity: City) => {
        navigate("cinemas", { newCity })
    }

    return (
        <div className="flex h-full items-center justify-center md:h-auto">
            <div className="flex max-h-full w-full flex-col overflow-auto px-6 py-6 md:w-[300px] md:px-0">
                {loading ? (
                    <Skeleton lines={8} itemClassName="w-full h-[50px]" />
                ) : (
                    <div className="flex flex-col gap-2">
                        {cities.map(cityItem => (
                            <div
                                className={`${cityItem.id === city.id ? "bg-accent" : "bg-text/15"} flex h-[50px] items-center justify-center rounded-[7px] text-[16px]/[21px] font-semibold tracking-[0.32px] hover:cursor-pointer`}
                                key={cityItem.id}
                                onClick={() => selectCity(cityItem)}>
                                {cityItem.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
