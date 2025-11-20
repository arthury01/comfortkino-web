import { Route, Routes, useLocation } from "react-router-dom"
import { Footer, Header } from "./layouts"
import Main from "./Main"
import Location from "./pages/location/Location"
import Auth from "./pages/auth/Auth"
import Buy from "./pages/buy/Buy"

const App = () => {
    const location = useLocation()
    const state = location.state as { backgroundLocation?: Location }
    const background = state?.backgroundLocation || location

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Main location={background} />
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/buy" element={<Buy />} />
                </Routes>
            )}
            <Footer />
        </div>
    )
}

export default App
