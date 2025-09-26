import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import Navbar from "./Navbar";

const DashBoardLayout = ({activeMenu, children}) => {
    const {user, loading} = useContext(UserContext);

    if (loading) {
        return (
            <div>
                <Navbar activeMenu={activeMenu} />
                <div className="flex justify-center items-center h-40">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar activeMenu={activeMenu} />
            {user && <div className="container mx-auto pt-4 pb-4">{children}</div>}
        </div>
    );
}

export default DashBoardLayout;