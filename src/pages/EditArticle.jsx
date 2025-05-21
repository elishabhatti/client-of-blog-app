import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    subtitle: "",
    content: "",
    thumbnailUrl: "",
    description: "",
    rating: "",
    duration: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // article ID from route

  const fetchArticle = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/articles/editArticle/${id}`,
        { withCredentials: true }
      );
      console.log(res);

      console.log(res.data.articles[0]);

      const article = res.data.articles[0];

      setArticleData({
        title: article.title || "",
        subtitle: article.subtitle || "",
        content: article.content || "",
        thumbnailUrl: article.thumbnailUrl || "",
        description: article.description || "",
        rating: article.rating || "",
        duration: article.duration || "",
      });
    } catch (error) {
      toast.error("Failed to load article data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/articles/updateArticle/${id}`,
        { ...articleData },
        { withCredentials: true }
      );
      toast.success("Article updated!");
      navigate("/profile"); // or wherever you want to redirect
    } catch (error) {
      toast.error("Failed to update article");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Edit Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm sm:text-base font-medium">Title*</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={articleData.subtitle}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium">Rating</label>
          <input
            type="text"
            name="rating"
            value={articleData.rating}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={articleData.duration}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnailUrl"
            value={articleData.thumbnailUrl}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium">Content</label>
          <textarea
            name="content"
            value={articleData.description}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
            rows="6"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Update Article
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
