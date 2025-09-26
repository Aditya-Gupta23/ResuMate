import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserProvider from "./context/UserContext"
import Dashboard from "./pages/Dashboard"
import VerifyOtp from "./components/VerifyOtp"
import EditResume from "./components/EditResume"
import { Toaster } from "react-hot-toast"

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume/:resumeId" element={<EditResume />} />
            </Routes>

            <Toaster toastOption={{
                className: "",
                style: {
                    fontSize: "13px"
                }
            }}>

            </Toaster>
        </UserProvider>
    )
}

export default App
