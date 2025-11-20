import { useEffect, useState } from "react"
import { Movie } from "../../types/entities/movie"
import { useRequest } from "../../hooks/useRequest"
import { appStore } from "../../store/appStore"
import { DateString, HomeLoader, MovieItem } from "../../features/home"

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const { cinema } = appStore()
    const { request } = useRequest()
    const [dates, setDates] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const datesData = await request("GET", `cinema/${cinema.id}/film/dates`)
            setDates(datesData)
            const moviesData = await request("GET", `cinema/${cinema.id}/film`)
            setMovies(moviesData)
            setLoading(false)
        }

        fetchData()
    }, [cinema.id])

    return (
        <>
            {loading ? (
                <HomeLoader />
            ) : (
                <div className="pt-4 pb-14">
                    {/* <DateString date={dates} /> */}
                    <div className="flex flex-col gap-10 px-4">
                        {movies.map(item => (
                            <div key={item.id}>
                                <MovieItem item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
