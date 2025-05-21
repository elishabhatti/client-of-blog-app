import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    bio: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // if you're passing user id in the URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/getUserData/`,
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
      } catch (error) {
        toast.error("Failed to load user data");
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/users/update/${id}`,
        { ...userData },
        {
          withCredentials: true,
        }
      );
      toast.success("Profile updated!");
      navigate("/profile"); // or wherever appropriat   e
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Username*</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block">Avatar URL</label>
          <input
            type="url"
            name="avatar"
            value={userData.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block">Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
