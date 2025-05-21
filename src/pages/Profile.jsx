import axios from "axios";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const UpdateProfile = () => {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    bio: "",
  });
  useEffect(() => {
    getUserDataFrom();
  }, []);

  async function getUserDataFrom() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/getUserData",
        {
          withCredentials: true,
        }
      );

      console.log(res);
      setUserData({
        username: res.data.user.username,
        avatar: res.data.user.avatar || "",
        bio: res.data.user.bio || "",
      });

      setId(res.data.user._id);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  }

  const handleFullViewProfile = (id) => {
    console.log(id);
  };

  return (
    <div className="w-full flex justify-between px-40 py-6">
      {/* Left Column */}
      <div className="w-[65%]">
        <h1 className="text-4xl font-bold mb-2">{userData.username}</h1>
        <div className="flex space-x-6 border-b border-gray-300 mb-6">
          <button className="py-2 border-b-2 border-black font-medium">
            Home
          </button>
          <button className="py-2 text-gray-500">About</button>
        </div>

        {/* Reading List Box */}
        <div className="flex border rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 flex-1">
            <p className="text-sm text-gray-500">{userData.username}</p>
            <h2 className="text-xl font-semibold mb-1">Reading list</h2>
            <p className="text-sm text-gray-500">1 story 🔒</p>
          </div>
          <img
            src="/path-to-your-image.jpg"
            alt="Reading list"
            className="w-40 object-cover"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-[30%] border-l pl-6">
        <div className="flex flex-col items-center">
          <img
            onClick={() => handleFullViewProfile(id)}
            src={userData.avatar}
            alt="Profile"
            className="w-30 h-30 cursor-pointer rounded-full bg-black mb-4 object-cover ring-2 ring-white shadow-sm"
          />

          <p className="text-lg font-semibold">
            {userData.username}
            <span className="text-sm font-light">he</span>
          </p>
          <p className="mt-2 text-sm text-gray-700">{userData.bio}</p>
          <button className="text-green-600 mt-2 hover:underline">
            <NavLink to={`/edit-profile/${id}`}>Edit Profile</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
