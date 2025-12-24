import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { authStyles } from "../assets/dummystyle";
import { Input } from "./Inputs";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({setCurrentPage}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if(!validateEmail(email)) {
            setError('Please enter a valid Email address');
            return;
        }
        if(!password) {
            setError('Please enter password');
            return;
        }
        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});
            const { accessToken, user } = response.data;
            if (accessToken) {
                updateUser({ user, accessToken });
            }

        } catch(error) {
            setError(error.response?.data?.message || 'Something went wrong. Please try again later.');
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className={authStyles.container}>
            <div className={authStyles.headerWrapper}>
                <h3 className={authStyles.title}>Welcome Back</h3>
                <p className={authStyles.subtitle}>Sign in to continue building amazing resumes</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className={authStyles.form}>
                <Input value={email} onChange={({target}) => setEmail(target.value)} 
                    label='Email'
                    placeholder='email@example.com'
                    type='email'
                />
                <Input value={password} onChange={({target}) => setPassword(target.value)} 
                    label='Password'
                    placeholder='Min 8 characters'
                    type='password'
                />

                {error && <div className={authStyles.errorMessage}>{error}</div>}
                <button type="submit" className={authStyles.submitButton}>
                    Sign In
                </button>

                {/* Google Button */}
                <div className="mt-2 flex flex-col items-center rounded-2xl">
                    <GoogleLogin
                        clientId = {import.meta.env.VITE_GOOGLE_CLIENT_ID}
                        onSuccess={async (credentialResponse) => {
                            try {
                                const token = credentialResponse.credential;

                                // send token to backend
                                const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_LOGIN, {
                                    id_token: token,
                                });

                                const { accessToken, user } = response.data;
                                if (accessToken) {
                                    updateUser({ user, accessToken });
                                }
                            } catch (error) {
                                setError("Google login failed. Please try again.", error);
                            }
                        }}
                        onError={() => setError("Google login failed.")}
                        theme="outline"   // "outline", "filled_blue", "filled_black"
                        size="large"          // "small", "medium", "large"
                        shape="circle"          // "rectangular", "pill", "circle", "square"
                        text="continue_with"    // "signin", "signup", "continue_with", "signin_with"
                    />
                </div>


                {/* Footer */}
                <p className={authStyles.switchText}>
                    Don't have an account?{' '}
                    <button type="button" className={authStyles.switchButton}
                        onClick={() => setCurrentPage('signup')}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Login;