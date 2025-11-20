import { Routes, Route } from "react-router-dom"
import { About, Edit, Favourites, History, Notifications, Promocode } from "./pages/profile/screens"
import { Home, More, News, NotFound, Promo, Tickets } from "./pages"
import Buy from "./pages/buy/Buy"
import Location from "./pages/location/Location"
import Auth from "./pages/auth/Auth"
import Profile from "./pages/profile/Profile"

const Main = ({ location }: { location: any }) => (
    <main className="mx-auto w-full max-w-3xl grow pt-14 lg:max-w-5xl xl:max-w-7xl">
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/location" element={<Location />} />
            <Route path="/buy" element={<Buy />} />

            <Route path="/tickets" element={<Tickets />} />
            <Route path="/news" element={<News />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="/more" element={<More />} />
            <Route path="/profile" element={<Profile />}>
                <Route path="edit" element={<Edit />} />
                <Route path="about" element={<About />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="history" element={<History />} />
                <Route path="promocode" element={<Promocode />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </main>
)

export default Main
