import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
      user.profilePic = reader.result; // optional
    };
    reader.readAsDataURL(file);
  };

  const applyFilter = (type) => {
    setFilter(type);
  };

  const generateRandomAvatar = () => {
    const randomSeed = Math.floor(Math.random() * 10000);
    setProfilePic(`https://api.dicebear.com/7.x/thumbs/svg?seed=${randomSeed}`);
    setFilter(""); // reset filter
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-16 transition-colors">
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
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-violet-500 shadow-lg">
              <img
                src={profilePic || "https://api.dicebear.com/7.x/thumbs/svg?seed=User"}
                alt="profile"
                className={`w-full h-full object-cover transition-all ${filter}`}
              />
            </div>

            {/* Upload Button */}
            <label className="absolute bottom-0 right-0 cursor-pointer bg-violet-600 hover:bg-violet-500 rounded-full px-2 py-1 text-xs shadow-md transition opacity-90 group-hover:opacity-100">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </label>
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
            {/* Random Avatar */}
            <button
              onClick={generateRandomAvatar}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-lg transition-shadow"
            >
              Random Avatar
            </button>

            {/* Copy Email */}
            <button
              onClick={() => navigator.clipboard.writeText(user?.email || "")}
              className="flex-1 py-3 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-400 transition-all"
            >
              Copy Email
            </button>
          </div>
        </div>

        {/* Job Alert Settings */}
        <div className="mt-14 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-violet-400">
                Job Alerts
            </h3>

            <div className="flex items-center justify-between">
                <p className="text-slate-300">
                Automatically receive job alerts based on your preferences
                </p>

                <input
                type="checkbox"
                checked={user?.jobAlert?.enabled}
                onChange={async (e) => {
                    try {
                    await axiosInstance.patch(API_PATHS.user.UPDATE_JOB_ALERT, {
                        enabled: e.target.checked,
                    });

                    user.jobAlert.enabled = e.target.checked;
                    } catch (err) {
                    console.error("Failed to update job alert", err);
                    }
                }}
                className="w-5 h-5 accent-violet-500"
                />
            </div>

            {user?.jobAlert?.enabled && (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="text-sm text-slate-400">Keywords</label>
                    <input
                    value={user.jobAlert.keywords}
                    disabled
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                </div>

                <div>
                    <label className="text-sm text-slate-400">Location</label>
                    <input
                    value={user.jobAlert.location}
                    disabled
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                    />
                </div>
                </div>
            )}
        </div>



        {/* Saved Resumes Section */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold mb-4">Your Resumes</h3>

          <div className="border border-slate-800 rounded-2xl shadow-lg p-6 bg-slate-900/40 backdrop-blur-xl text-center text-slate-400">
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
