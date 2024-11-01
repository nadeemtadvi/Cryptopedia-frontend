import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SetUser } from "../redux/AuthSlice";
import { BaseUrl, patch } from "../services/Endpoint";

const Profile = () => {
  const [name, setName] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { userId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Fixed prevent default typo
    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("oldpassword", oldpassword);
    formData.append("newpassword", newpassword);
    if (profileImage) {
      formData.append("profile", profileImage);
    }
    try {
      const res = await patch(`/auth/profile/${userId}`, formData); // Ensure patch method is correctly imported
      const data = res.data;
      if (res.status === 200) {
        toast.success(data.message);
        dispatch(SetUser(data.user)); // Update user state in Redux
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.FullName); // Prefill form with current user name
    }
  }, [user]); // Added user as a dependency

  return (
    <div className="flex items-center justify-center min-h-screen max-w-screen-2xl mx-auto">
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-black mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <div className="p-3 flex justify-center">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)} // Preview new image
                  alt="Avatar"
                  className="w-20 h-20 object-cover rounded-full"
                />
              ) : (
                <img
                  src={`${BaseUrl}/images/${user?.profile}`} // Display current image if no new image is uploaded
                  alt="Avatar"
                  className="w-20 h-20 object-cover rounded-full"
                />
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 text-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Update Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Old Password"
              value={oldpassword}
              onChange={(e) => setOldpassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
