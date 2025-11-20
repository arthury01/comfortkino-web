import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Bell, Location as LocationIcon, Logo, RightArrow } from "../../components/svgCollection"
import { useEffect, useState } from "react"
import { appStore } from "../../store/appStore"
import { routeTitles } from "../../lib/routeTitles"
import { Skeleton } from "../../components/Skeleton"
import { userStore } from "../../store/userStore"

export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const pathName = location.pathname
    const allowedPaths = ["/", "/tickets", "/specials", "/profile"]
    const title = routeTitles[pathName] || "Мягкий кинотеатр"
    const [logoLoaded, setLogoLoaded] = useState(false)
    const { user } = userStore()
    const { cinema, city } = appStore()

    const navLinks = [
        { to: "/", label: "Афиша" },
        { to: "/tickets", label: "Билеты" },
        { to: "/news", label: "Новости" },
        { to: "/promo", label: "Акции" },
        { to: "/more", label: "Еще..." },
        user ? { to: "/profile", label: "Профиль" } : { to: "/auth", label: "Войти", state: { backgroundLocation: location } }
    ]

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-md">
            {/* TabsHeader */}
            <div
                className={`mx-auto ${
                    allowedPaths.includes(pathName) ? "flex" : "hidden md:flex"
                } h-13 max-w-3xl items-center justify-between px-4 lg:max-w-5xl xl:max-w-7xl`}>
                {/* mobile */}
                <NavLink to="/location" className="md:hidden" state={{ backgroundLocation: location }}>
                    <LocationIcon />
                </NavLink>
                <NavLink to="/" className="relative flex h-[35px] w-[120px] items-center justify-center overflow-hidden md:hidden">
                    <img
                        src={cinema.logo}
                        alt=""
                        onLoad={() => setLogoLoaded(true)}
                        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                            logoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {!logoLoaded && <Skeleton className="h-full w-full" itemClassName="w-full h-full" />}
                </NavLink>
                <NavLink to="/profile/notifications" className="md:hidden">
                    <Bell />
                </NavLink>

                {/* desktop */}
                <div className="hidden items-center gap-5 md:flex">
                    <NavLink to="/">
                        <Logo />
                    </NavLink>

                    <NavLink to="/location" className="flex items-center gap-1.25 pt-2" state={{ backgroundLocation: location }}>
                        <div className="flex flex-col gap-0.5">
                            <div className="text-[12px]/[13px] font-semibold tracking-[0.06px]">{city.name}</div>
                            <div className="text-[10px]/[13px] tracking-[0.06px] text-[#459BEA]">{cinema.name}</div>
                        </div>
                    </NavLink>
                </div>
                <nav className="hidden flex-row gap-4 text-[13px]/[13px] font-semibold md:flex">
                    {navLinks.map(({ to, label, state }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `transition-opacity ${isActive ? "text-accent opacity-100" : "opacity-60"}`}
                            state={state}>
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* ScreensHeader */}
            <div
                className={`mx-auto ${
                    !allowedPaths.includes(pathName) ? "flex md:hidden" : "hidden"
                } h-13 max-w-3xl items-center justify-between px-4 lg:max-w-5xl xl:max-w-7xl`}>
                <div className="rotate-180 hover:cursor-pointer" onClick={() => navigate(-1)}>
                    <RightArrow />
                </div>

                <div className="text-[17px]/[18px] font-semibold tracking-[-0.07px]">{title}</div>

                <div className="opacity-0">
                    <RightArrow />
                </div>
            </div>
        </header>
    )
}
