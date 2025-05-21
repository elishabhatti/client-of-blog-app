import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Eye,
  MessageCircle,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const UpdateProfile = () => {
  const [id, setId] = useState("");
  const [articles, setArticles] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    bio: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUserDataFrom(), getUserArticleWithId();
  }, []);

  async function getUserDataFrom() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/getUserData",
        { withCredentials: true }
      );

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

  async function getUserArticleWithId(id) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/getAllArticeOfUser/${id}`,
        { withCredentials: true }
      );
      setArticles(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  }

  const handleFullViewProfile = (id) => {
    console.log(id);
  };

  const handleEditArticle = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/articles/editcArtile/${id}`,
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between px-4 md:px-10 lg:px-20 py-6 gap-8">
      {/* Left Column */}
      <div className="w-full md:w-[65%]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {userData.username}
        </h1>
        <div className="flex space-x-6 border-b border-gray-300 mb-6 overflow-x-auto">
          <button className="py-2 border-b-2 border-black font-medium">
            Home
          </button>
          <button className="py-2 text-gray-500">About</button>
        </div>

        {/* Reading List Box */}
        <div className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-sm mb-6">
          <div className="p-4 flex-1">
            <p className="text-sm text-gray-500">{userData.username}</p>
            <h2 className="text-xl font-semibold mb-1">Reading list</h2>
            <p className="text-sm text-gray-500">1 story 🔒</p>
          </div>
          <img
            src="/path-to-your-image.jpg"
            alt="Reading list"
            className="w-full sm:w-40 h-32 sm:h-auto object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          {articles && articles.length > 0 ? (
            [...articles].reverse().map((post) => (
              <div
                key={post._id}
                className="flex flex-col sm:flex-row justify-between items-start bg-white p-4 sm:p-6 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="flex-1 sm:pr-4">
                  <div className="text-sm text-gray-500 mb-1">
                    <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                      LAB
                    </span>
                    In Language Lab by{" "}
                    <span className="font-medium text-gray-700">
                      {post.username}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {post.title.length >= 30
                      ? post.title.slice(0, 30) + "..."
                      : post.title}
                  </h2>
                  <h3 className="text-sm text-gray-900 mb-1">
                    {post.subtitle.length >= 50
                      ? post.subtitle.slice(0, 50) + "..."
                      : post.subtitle}
                  </h3>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" /> {post.date?.split("T")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {post.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp
                        onClick={() => handleLikePost(post._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      {post.likes.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsDown
                        onClick={() => handleDislikePost(post._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      {post.dislikes.length}
                    </span>
                    <span
                      onClick={() => navigate(`/article/${post._id}`)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />{" "}
                      {post.comments.length}
                    </span>
                    <span className="ml-auto flex items-center gap-4 mt-2 sm:mt-0">
                      <button onClick={() => handleSaveArticleSubmit(post._id)}>
                        <Bookmark className="w-4 h-4 cursor-pointer hover:text-black" />
                      </button>
                      <button onClick={() => handleEditArticle(id)}>
                        <NavLink
                          to={`/editArticle/${id}`}
                          className="text-sm sm:text-base text-blue-600 hover:underline"
                        >
                          Edit Profile
                        </NavLink>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-48 h-40 sm:h-28 mt-4 sm:mt-0 flex-shrink-0 cursor-pointer">
                  <img
                    onClick={() => navigate(`/article/${post._id}`)}
                    src={
                      post.thumbnailUrl.length === 0
                        ? "https://img.freepik.com/free-vector/abstract-red-circle-black-background-technology_1142-9839.jpg"
                        : post.thumbnailUrl
                    }
                    alt="Thumbnail"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No articles found.</p>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-[30%] border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
        <div className="flex flex-col items-center text-center">
          <img
            onClick={() => handleFullViewProfile(id)}
            src={
              userData.avatar ||
              "https://i.pinimg.com/736x/d2/64/e3/d264e36c185da291cf7964ec3dfa37b8.jpg"
            }
            alt="Profile"
            className="w-28 h-28 sm:w-32 sm:h-32 cursor-pointer rounded-full bg-black mb-4 object-cover ring-2 ring-white shadow-sm"
          />
          <p className="text-lg font-semibold">
            {userData.username}
            <span className="text-sm font-light ml-1">he</span>
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
