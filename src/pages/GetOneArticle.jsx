import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";

const GetOneArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState("");

  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      <div className="mt-5">
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
      </div>
    </div>
  );
};

export default GetOneArticle;
