import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user)   return;

        const accessToken = localStorage.getItem('accessToken');
        if(!accessToken) {
            setLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data.user);
            } catch(error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = ({ user, accessToken }) => {
        setUser(user);
        localStorage.setItem('accessToken', accessToken);
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
    };

    const logoutUser = async () => {
        try {
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("accessToken"); // clear client token
            setUser(null);                          // reset React state
            window.location.href = "/login";        // redirect
        }
    };

    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;