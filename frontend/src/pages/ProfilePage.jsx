import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Your <span className="bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
          >
            Go Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="mt-10 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-xl p-8 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border border-violet-500 shadow-lg">
            <img
              src={user?.profilePic || "https://api.dicebear.com/7.x/thumbs/svg?seed=User"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold">{user?.name || "Full Name"}</h2>
            <p className="text-slate-300 text-sm">{user?.email || "email@example.com"}</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-800 my-4"></div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg transition-shadow">
              Edit Profile
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
              Change Password
            </button>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold mb-4">Your Resumes</h3>

          <div className=" border border-slate-800 rounded-2xl shadow-lg p-6 bg-slate-900/40 backdrop-blur-xl text-center text-slate-400">
            <p>No resumes yet. Start building one!</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Create Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
