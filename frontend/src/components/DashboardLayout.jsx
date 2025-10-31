import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import Navbar from "./Navbar";

const DashBoardLayout = ({activeMenu, children}) => {
    const {user, loading} = useContext(UserContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center mx-auto mt-25">
                <Navbar activeMenu={activeMenu} />
                <div
                    className="
                        w-16 h-16
                        rounded-full
                        border-5 
                        border-t-4
                        border-t-indigo-500
                        border-gray-200
                        animate-spin
                        shadow-xl
                    "
                    role="status"
                    aria-label="loading"
                >
                    {/* Screen reader text for accessibility */}
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar user={user} activeMenu={activeMenu} />
            {user && <div className="container mx-auto pt-4 pb-4 mt-16">{children}</div>}
        </div>
    );
}

export default DashBoardLayout;