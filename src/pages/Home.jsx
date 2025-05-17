import { useEffect, useState } from "react";
import {
  Bookmark,
  MessageCircle,
  Eye,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    getAllArticles();
  }, [handleLikePost, handleDislikePost]);

  const navigate = useNavigate();

  const staffPicks = [
    {
      id: 1,
      title:
        "Can You Spot Fake News? Many Can’t When Scored on a Validated Test",
      author: "Andrea Romeo RN, BN",
      avatar: "https://i.pravatar.cc/40?img=4",
      date: "Apr 18",
    },
    {
      id: 2,
      title: "I worked for Pope Francis. Here is what he was really like.",
      author: "Daniel B. Gallagher",
      avatar: "https://i.pravatar.cc/40?img=5",
      date: "Apr 21",
    },
    {
      id: 3,
      title: "My Notes App Is a Beautiful Mess of Creativity and Chaos",
      author: "Vaibhavi Naik",
      avatar: "https://i.pravatar.cc/40?img=6",
      date: "Apr 16",
    },
  ];

  const topics = [
    "Relationships",
    "Python",
    "Cryptocurrency",
    "Politics",
    "Women",
    "Fitness",
    "AWS",
  ];

  const [articles, setArticles] = useState([]);

  const getAllArticles = async () => {
    try {
      const articles = await axios.get(
        "http://localhost:3000/api/articles/getArticle",
        {
          withCredentials: true,
        }
      );
      setArticles(articles.data.message);
    } catch (error) {
      toast.error(
        "Error While Get Articles:",
        error.response?.data || error.message
      );
      console.error(error);
    }
  };

  const handleSaveArticleSubmit = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/articles/saveArticle/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Error saving article"
      );
      console.error(error);
    }
  };
  async function handleLikePost(id) {
    await axios.post(
      `http://localhost:3000/api/articles/addLike/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  async function handleDislikePost(id) {
    await axios.post(
      `http://localhost:3000/api/articles/addDislike/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);
  }

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-10 flex-wrap lg:flex-nowrap">
      <div className="flex-1 space-y-6">
        {articles && articles.length > 0 ? (
          [...articles].reverse().map((post) => (
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
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {post.subtitle.length >= 50
                    ? post.title.slice(0, 50) + "..."
                    : post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 gap-4">
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
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="w-4 h-4 cursor-pointer" />{" "}
                    {post.comments.length}
                  </span>
                  <span className="ml-auto flex items-center gap-4">
                    <button onClick={() => handleSaveArticleSubmit(post._id)}>
                      <Bookmark className="w-4 h-4 cursor-pointer hover:text-black" />
                    </button>
                    <button>
                      <span className="text-xl cursor-pointer font-light">
                        …
                      </span>
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

      <aside className="w-full lg:w-[30%] mt-6 lg:mt-0">
        <h3 className="text-lg font-semibold mb-4">Staff Picks</h3>
        <div className="space-y-5 mb-6">
          {staffPicks.map((pick) => (
            <div key={pick.id} className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={pick.avatar}
                  alt={pick.author}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-gray-600">{pick.author}</p>
              </div>
              <p className="font-medium text-gray-900">{pick.title}</p>
              <p className="text-xs text-gray-500">{pick.date}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Recommended topics</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition"
            >
              {topic}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Home;
