import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserProvider from "./context/UserContext"
import Dashboard from "./pages/Dashboard"
import VerifyOtp from "./components/VerifyOtp"

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />\
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </UserProvider>
    )
}

export default App
