import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useContext(UserContext);

  // email comes from signup redirect
  const email = location.state?.email;

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      updateUser(response.data); // saves token + user
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    }
  };

  const handleResend = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, { email });
      alert("New OTP sent!");
    } catch (error) {
      setError("Could not resend OTP", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-1000 px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent text-center">
          Verify Your Email
        </h3>
        <p className="mt-2 text-gray-600 text-center">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-lg tracking-widest"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-rose-80 transform transition-transform duration-200 active:scale-95"
          >
            Verify
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
