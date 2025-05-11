import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const GetOneArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");

  const handleArticleChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/articles/getOnlyOneArticle/${id}`,
          {
            withCredentials: true,
          }
        );
        setUsername(response.data.message.username);
        setArticle(response.data.message);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Error getting article"
        );
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/articles/commentOnArticle`,
        { articleId: id, comment },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Comment submitted!");
      setComment("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error submitting comment"
      );
    }
  };

  if (!article) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <h2 className="text-xl font-semibold mb-4">{article.subtitle}</h2>
      <img
        src={
          article && article.thumbnailUrl.length === 0
            ? "https://img.freepik.com/free-vector/abstract-red-circle-black-background-technology_1142-9839.jpg"
            : article.thumbnailUrl
        }
        alt="Thumbnail"
        className="w-full my-4 rounded-md"
      />
      <p className="text-gray-600 mb-4">{article.description}</p>
      <p className="mt-4 text-sm text-gray-500">By {article.username}</p>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Responses</h3>

        {article.comments && article.comments.length > 0 ? (
          <ul className="space-y-4">
            {article.comments.map((c, idx) => (
              <li key={idx} className="p-4 border rounded shadow-sm">
                <p className="text-gray-700 mb-[-8px]">{c.text}</p>
                <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
                  <p>Response by {c.username || "Anonymous"} </p>
                  <p>{new Date(c.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <div className="mt-5">
        <form onSubmit={handleCommentSubmit}>
          <label className="text-gray-500" htmlFor="comment">
            Give Your Response:
          </label>
          <textarea
            name="comment"
            value={comment}
            placeholder="Enter Your Response Here About This Article"
            onChange={handleArticleChange}
            className="w-full p-2 border border-grey-400 outline-none rounded"
            rows="5"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Response
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetOneArticle;
