import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/roomService";

function ProfileModal({ user, onClose }) {
  const navigate = useNavigate();

  const { logout, updateUser } = useAuth();

  const fileInputRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState(user.fullName);

  const [selectedImage, setSelectedImage] = useState(null);

  const [preview, setPreview] = useState(user.avatar);

  if (!user) return null;

  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ==========================
  // Choose Image
  // ==========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // Save Profile
  // ==========================

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName);

      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      const data = await updateProfile(formData);

      updateUser(data.user);

      setEditing(false);

      setSelectedImage(null);

      alert("Profile Updated Successfully 🎉");
    } catch (error) {
      console.error(error);

      alert("Profile Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="bg-slate-800 rounded-2xl w-[390px] p-6 relative shadow-2xl">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Avatar */}

        <div className="flex flex-col items-center">

          {preview ? (
            <img
              src={preview}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-4xl font-bold text-white">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Hidden Input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          {/* Name */}

          {!editing ? (
            <h2 className="text-2xl font-bold text-white mt-4">
              {user.fullName}
            </h2>
          ) : (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-4 bg-slate-700 text-white rounded-lg px-3 py-2 w-full outline-none"
            />
          )}

          <p className="text-gray-400 mt-2">
            {user.email}
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-3">

          {!editing ? (
            <>
              <button
                onClick={() => {
                  setEditing(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 transition"
              >
                Change Avatar
              </button>

              <button
                disabled={loading}
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => {
                  setEditing(false);

                  setFullName(user.fullName);

                  setPreview(user.avatar);

                  setSelectedImage(null);
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-3 transition"
              >
                Cancel
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileModal;