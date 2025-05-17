import  { useEffect, useState } from "react";
import { MessageCircle, Eye, Star, Delete, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SavedArticle = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [articles, setArticles] = useState([]);

  async function getAllArticles() {
    try {
      const res = await axios.get("http://localhost:3000/api/articles/saveArticle", {
        withCredentials: true,
      });
      setUsername(res.data.articles[0]?.username || "Unknown");
      setArticles(res.data.articles);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    getAllArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/articles/deleteSavedArticle`,
        { articleId: id },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove article");
      console.error(error);
    }
  };

  async function handleLikePost(id) {
    try {
      await axios.post(`http://localhost:3000/api/articles/addLike/${id}`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Like failed:", error);
    }
  }

  async function handleDislikePost(id) {
    try {
      const res = await axios.post(`http://localhost:3000/api/articles/addDislike/${id}`, {}, {
        withCredentials: true,
      });
      console.log(res.data.message); // optional
    } catch (error) {
      console.error("Dislike failed:", error);
    }
  }

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-10 flex-wrap lg:flex-nowrap">
      <div className="flex-1">
        <h1 className="text-2xl ml-6 font-bold">Saved Articles by {username}</h1>
        {articles && articles.length > 0 ? (
          articles.map((post) => (
            <div
              key={post._id}
              className="flex justify-between items-start bg-white p-6 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex-1 pr-4">
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
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" /> {post.date?.split("T")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {post.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {post.comments.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp onClick={() => handleLikePost(post._id)} className="w-4 h-4 cursor-pointer" />
                    {post.likes.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsDown onClick={() => handleDislikePost(post._id)} className="w-4 h-4 cursor-pointer" />
                    {post.dislikes.length}
                  </span>
                  <span className="ml-auto flex items-center gap-4">
                    <button>
                      <span className="text-xl cursor-pointer font-light">…</span>
                    </button>
                    <button onClick={() => handleDeleteArticle(post._id)}>
                      <Delete className="w-4 cursor-pointer h-4" />
                    </button>
                  </span>
                </div>
              </div>
              <div className="w-48 h-28 flex-shrink-0 cursor-pointer">
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
  );
};

export default SavedArticle;
