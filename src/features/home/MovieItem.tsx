import { Hat, Like } from "../../components/svgCollection"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { Movie } from "../../types/entities/movie"
import SessionString from "./SessionString"

export default function MovieItem({ item }: { item: Movie }) {
    const isMobile = useMediaQuery("(max-width: 767px)")

    return (
        <div key={item.id} className="flex flex-col gap-4 md:flex-row">
            <img
                src={isMobile ? item.poster_mobile.big : item.poster.big}
                alt=""
                className="aspect-[650-348] rounded-2xl md:max-w-[170px]"
            />
            <div className="flex w-full flex-col gap-5">
                <div className="flex justify-between gap-1">
                    <div className="flex flex-col gap-1">
                        <div className="text-[17px] font-bold tracking-[0.38px] md:text-xl/[24px]">{item.name}</div>
                        <div className="text-[13px]/[18px] tracking-[-0.078px]">{item.genres} ●</div>
                    </div>
                    <div className="flex gap-[5px] opacity-50">
                        <div className="tracking-[-0.078px flex aspect-square h-10 items-center justify-center rounded-full border-[1.5px] text-sm/[18px] font-medium">
                            {item.age}
                        </div>
                        <div className="flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-[1.5px]">
                            {item.favourites ? <Like /> : <Like />}
                        </div>
                    </div>
                </div>
                {(item.privileges.pushkin_card ||
                    item.privileges.invitational ||
                    item.privileges.child_place ||
                    item.privileges.discount) && (
                    <div className="flex flex-wrap gap-2.5">
                        {item.privileges.pushkin_card && (
                            <div className="bg-text/15 flex w-fit gap-2 rounded-sm px-2 py-1">
                                <Hat />
                                <div className="text-[13px]/[18px] font-medium tracking-[-0.078px]">Пушкинская карта</div>
                            </div>
                        )}
                        {item.privileges.invitational && (
                            <div className="bg-text/15 flex w-fit gap-2 rounded-sm px-2 py-1">
                                <div className="text-[13px]/[18px] font-medium tracking-[-0.078px]">Пригласительные</div>
                            </div>
                        )}
                        {item.privileges.child_place && (
                            <div className="bg-text/15 flex w-fit gap-2 rounded-sm px-2 py-1">
                                <div className="text-[13px]/[18px] font-medium tracking-[-0.078px]">Детям бесплатно</div>
                            </div>
                        )}
                        {item.privileges.discount && (
                            <div className="bg-text/15 flex w-fit gap-2 rounded-sm px-2 py-1">
                                <div className="text-[13px]/[18px] font-medium tracking-[-0.078px]">Скидка</div>
                            </div>
                        )}
                    </div>
                )}
                <SessionString
                    sessions={item.sessions}
                    movieData={{ privileges: item.privileges, poster: item.poster.big, poster_mobile: item.poster_mobile.big }}
                />
            </div>
        </div>
    )
}
