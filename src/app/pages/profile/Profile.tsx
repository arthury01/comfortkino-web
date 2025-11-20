import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useRef } from "react"
import ConfirmModal, { ConfirmModalHandle } from "../../../components/ConfirmModal"
import { userStore } from "../../../store/userStore"
import { About, Bell, Card, Exit, Favourite, History, Messages, Promocode, RightArrow, Star } from "../../../components/svgCollection"

export default function Profile() {
    const pathName = location.pathname
    const isRoot = pathName === "/profile"

    return (
        <div className="px-4">
            <div className="md:hidden">{isRoot ? <ProfileSidebar /> : <Outlet />}</div>

            <div className="hidden gap-4 md:flex">
                <div className="w-full">
                    <ProfileSidebar />
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

function ProfileSidebar() {
    const location = useLocation()
    const navigate = useNavigate()
    const pathName = location.pathname

    const confirmRef = useRef<ConfirmModalHandle>(null)
    const { user, clearAuth } = userStore()
    const card = user ? user.cards.find(item => item.blocked === false) : null

    const sections = [
        { title: "Справка", description: "Ответы на часто задаваемые вопросы", icon: <About />, href: "/profile/about" },
        { title: "Уведомления", description: "Что тут происходит 👀", icon: <Bell />, href: "/profile/notifications", user: true },
        { title: "Избранное", description: "То, что вы сохранили ♡", icon: <Favourite />, href: "/profile/favourites", user: true },
        { title: "История покупок", description: "Ранее приобретенные билеты", icon: <History />, href: "/profile/history", user: true },
        { title: "Активировать промокод", description: "Бонусы", icon: <Promocode />, href: "/profile/promocode", user: true },
        {
            title: "Чат тех. поддержки",
            description: "При возникновении неполадок",
            icon: <Messages />,
            href: "https://t.me/comfortkinohelp_bot"
        }
    ]

    const filtered = user ? sections : sections.filter(s => !s.user)
    const isActive = (href: string) => (pathName === href ? "bg-[#349BE626]" : "")

    const onExitClick = () => {
        confirmRef.current?.open({
            title: "Выйти из профиля?",
            description: "Уверены, что хотите выйти из профиля?",
            confirmText: "Выйти",
            onConfirm: () => clearAuth()
        })
    }

    const SectionItem = ({
        icon,
        title,
        description,
        href,
        onClick,
        error
    }: {
        icon: React.ReactNode
        title: string
        description?: string
        href?: string
        onClick?: () => void
        error?: boolean
    }) => {
        const content = (
            <div className={`flex w-full items-center justify-between rounded-lg p-2 ${error ? "text-error" : isActive(href || "")}`}>
                <div className="flex items-center gap-4">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[7px] ${error ? "bg-error/15" : "bg-white/15"}`}>
                        {icon}
                    </div>
                    <div>
                        <div className="text-[17px]/6 font-semibold tracking-[-0.4px]">{title}</div>
                        {description && <div className="opacity-60">{description}</div>}
                    </div>
                </div>
                <RightArrow />
            </div>
        )

        return href ? (
            <NavLink to={href} className="w-full border-b border-white/15 py-2">
                {content}
            </NavLink>
        ) : (
            <button onClick={onClick} className="w-full border-b border-white/15 py-2">
                {content}
            </button>
        )
    }

    return (
        <div className={`flex min-h-[calc(100dvh-56px)] flex-col pb-14 md:min-h-auto ${!user ? "justify-end" : ""}`}>
            <ConfirmModal ref={confirmRef} />
            <div className="flex flex-col items-center pb-4 text-xs/5 tracking-[-0.24px]">
                {user ? (
                    <div className="flex w-full flex-col gap-2 py-2">
                        <NavLink
                            to="/profile/edit"
                            className={`flex items-center justify-between gap-4 rounded-lg p-2 ${isActive("/profile/edit")}`}>
                            <div className="flex items-center gap-4">
                                <img
                                    src={user.image || require("../../../assets/profile.png")}
                                    alt="profile"
                                    width={72}
                                    height={72}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="text-text/60 text-[13px]/[18px] tracking-[-0.7px]">Добрый день,</div>
                                    <div className="line-clamp-2 text-[22px]/[28px] font-bold tracking-[0.35px] break-all">
                                        {user.first_name}
                                    </div>
                                </div>
                            </div>
                            <RightArrow />
                        </NavLink>

                        {card && (
                            <div className="from-primary to-primary/47 flex flex-col gap-4 rounded-[7px] bg-linear-to-b p-4 pb-[9px]">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <Card />
                                        <div className="text-[13px]/[18px] tracking-[-0.07px]">{card.number}</div>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <Star />
                                        <div className="text-text/60 text-[13px]/[18px] font-semibold tracking-[-0.07px]">
                                            {card.movie.percents * 100}%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-text/60 text-[13px]/[18px] tracking-[-0.07px]">баллов на карте</div>
                                    <div className="text-[34px]/[41px] font-bold tracking-[0.37px]">{card.movie.balance}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex w-full justify-center border-b border-white/15 py-4">
                        <button
                            onClick={() => navigate("/auth")}
                            className="flex h-[50px] items-center px-4 text-base/[21px] font-semibold tracking-[-0.32px]">
                            Войти по номеру
                        </button>
                    </div>
                )}

                {/* Секции */}
                <div className="flex w-full flex-col items-center text-xs/5 tracking-[-0.24px]">
                    {filtered.map(({ icon, title, description, href }) => (
                        <SectionItem key={href} icon={icon} title={title} description={description} href={href} />
                    ))}
                </div>

                {/* Выход */}
                {user && <SectionItem icon={<Exit />} title="Выйти из профиля" onClick={onExitClick} error />}
            </div>
        </div>
    )
}
