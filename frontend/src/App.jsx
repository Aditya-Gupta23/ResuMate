import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import UserProvider from "./context/UserContext"
import Dashboard from "./pages/Dashboard"
import VerifyOtp from "./components/VerifyOtp"
import EditResume from "./components/EditResume"
import AtsScoreChecker from "./pages/AtsScoreChecker"
import { Toaster } from "react-hot-toast"
import PrivateRoute from "./components/PrivateRoute"
import ProfilePage from "./pages/ProfilePage"

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route 
                    path="/dashboard" 
                    element = {
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/resume/:resumeId" 
                    element = {
                        <PrivateRoute>
                            <EditResume />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/ats-checker" 
                    element = {
                        <PrivateRoute>
                            <AtsScoreChecker />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/profile-page" 
                    element = {
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
            </Routes>

            <Toaster toastOptions={{
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
