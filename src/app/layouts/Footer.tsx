import { NavLink } from "react-router-dom"
import {
    HomeIcon,
    HomeIconFocused,
    OK,
    ProfileIcon,
    ProfileIconFocused,
    PromotionsIcon,
    PromotionsIconFocused,
    TicketsIcon,
    TicketsIconFocused,
    TicketsNotify,
    TicketsNotifyFocused,
    VK
} from "../../components/svgCollection"

export default function Footer() {
    const navItems = [
        {
            to: "/",
            label: "Афиша",
            icon: <HomeIcon />,
            focusedIcon: <HomeIconFocused />
        },
        {
            to: "/tickets",
            label: "Билеты",
            icon: false ? <TicketsNotify /> : <TicketsIcon />,
            focusedIcon: false ? <TicketsNotifyFocused /> : <TicketsIconFocused />
        },
        {
            to: "/specials",
            label: "Акции",
            icon: <PromotionsIcon />,
            focusedIcon: <PromotionsIconFocused />
        },
        {
            to: "/profile",
            label: "Профиль",
            icon: <ProfileIcon />,
            focusedIcon: <ProfileIconFocused />
        }
    ]

    return (
        <footer>
            {/* desktop */}
            {/* <div className="md:max-h-auto mx-auto hidden max-h-none w-full max-w-3xl flex-wrap items-start justify-between gap-4 p-4 text-[13px]/[18px] tracking-[-0.078px] md:flex lg:max-w-5xl xl:max-w-7xl">
                <div className="grid w-fit gap-y-4">
                    <div className="text-[17px]/[24px] font-semibold">Кинотеатр</div>
                    <div className="grid gap-y-2">
                        <div>Пушкинская карта</div>
                        <div>Акции и скидки</div>
                        <div>Новости</div>
                        <div>Вакансии</div>
                        <div>Помощь</div>
                    </div>
                </div>
                <div className="grid w-fit gap-y-4">
                    <div className="text-[17px]/[24px] font-semibold">Афиша</div>
                    <div className="grid gap-y-2">
                        <div>Все фильмы</div>
                        <div>Подборки</div>
                    </div>
                </div>
                <div className="grid w-fit gap-y-4">
                    <div className="text-[17px]/[24px] font-semibold">Личный кабинет</div>
                    <div className="grid gap-y-2">
                        <div>Активировать карту</div>
                        <div>Активировать промокод</div>
                    </div>
                </div>
                <div className="flex w-fit gap-x-7.5 gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        <div className="text-[17px]/[24px] font-semibold">Контакты</div>
                        <div className="flex gap-x-2">
                            <VK />
                            <OK />
                        </div>
                        <div className="grid gap-y-2">
                            <div className="flex h-10 w-35 items-center justify-center rounded-lg bg-[#3B4C6C]">+7 (351) 210-11-11</div>
                            <div className="bg-accent flex h-10 w-35 items-center justify-center rounded-lg">Оставить отзыв</div>
                        </div>
                    </div>
                </div>
                <img className="max-h-[136px] w-auto rounded-lg object-contain" src={require("../../assets/footer-map.png")} alt="footer-map" />
            </div> */}

            {/* mobile */}
            <nav className="fixed bottom-0 left-0 z-10 flex h-14 w-full items-center justify-between px-6 backdrop-blur-md md:hidden">
                {navItems.map(({ to, label, icon, focusedIcon }) => (
                    <NavLink key={to} to={to} className="flex flex-col items-center justify-center gap-y-1.5">
                        {({ isActive }) => (
                            <>
                                <div className="h-6 w-6">{isActive ? focusedIcon : icon}</div>
                                <span className={`text-[11px]/[13px] font-semibold ${isActive ? "opacity-100" : "opacity-60"}`}>
                                    {label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </footer>
    )
}
