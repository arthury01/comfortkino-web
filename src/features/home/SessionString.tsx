import { Link, NavLink, useLocation } from "react-router-dom"
import { Movie } from "../../types/entities/movie"
import { ThreeD } from "../../components/svgCollection"

export default function SessionString({
    sessions,
    movieData
}: {
    sessions: Movie["sessions"]
    movieData: { privileges: Movie["privileges"]; poster: string; poster_mobile: string }
}) {
    const location = useLocation()
    return (
        <div className="scrollbar-hide flex w-dvw flex-nowrap gap-2 self-center overflow-x-scroll px-4 md:w-full md:flex-wrap md:px-0">
            {sessions.map(item => (
                <NavLink
                    to={`/buy`}
                    state={{ session: item, movieData, backgroundLocation: location }}
                    key={item.id}
                    className="flex flex-col items-center justify-end gap-1">
                    {item.format === "3d" && <ThreeD />}
                    <div className="bg-primary cursor-pointer rounded px-4 py-1 text-sm font-semibold">{item.time}</div>
                    <div className="text-xs text-white/60">{item.price_name}</div>
                </NavLink>
            ))}
        </div>
    )
}
