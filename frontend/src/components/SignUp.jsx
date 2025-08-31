import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStyles } from "../assets/dummystyle";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Input } from "./inputs";

const SignUp = ({setCurrentPage}) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        if(!fullName) {
            setError('Please enter FullName');
            return;
        }
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
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password
            });
            
            if (response.status === 201) {
                // redirect to OTP verification page, pass email
                navigate("/verify-otp", { state: { email } });
            }
            
        } catch(error) {
            setError(error.response?.data?.message || 'Something went wrong. Please try again later.');
        }
    }

    return (
        <div className={authStyles.signupContainer}>
            <div className={authStyles.headerWrapper}>
                <h3 className={authStyles.signupTitle}>Create Account</h3>
                <p className={authStyles.signupSubtitle}>Join thousands of professionals today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className={authStyles.signupForm}>
                <Input value={fullName} onChange={({target}) => setFullName(target.value)} 
                    label='Full Name'
                    placeholder='Manish kumar'
                    type='text'
                />
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
                <button type="submit" className={authStyles.signupSubmit}>
                    Create Account
                </button>

                {/* Footer */}
                <p className={authStyles.switchText}>
                    Already have an account?{' '}
                    <button type="button" className={authStyles.signupSwitchButton}
                        onClick={() => setCurrentPage('login')}
                    >
                        Sign In
                    </button>
                </p>
            </form>
        </div>
    );
}

export default SignUp;