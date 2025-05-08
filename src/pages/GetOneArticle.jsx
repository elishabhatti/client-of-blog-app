import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const GetOneArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/articles/getOnlyOneArticle/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(response);
        
        setArticle(response.data.message); // Adjust depending on your backend response structure
      } catch (error) {
        toast.error(
          error.response?.data?.message || error.message || "Error getting article"
        );
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <h2 className="text-xl font-semibold mb-4">{article.subtitle}</h2>
      <p className="text-gray-600 mb-4">{article.description}</p>
      <img
        src={
          article && article.thumbnailUrl.length === 0
            ? "https://img.freepik.com/free-vector/abstract-red-circle-black-background-technology_1142-9839.jpg"
            : article.thumbnailUrl
        }
        alt="Thumbnail"
        className="w-full rounded-md"
      />
      <p className="mt-4 text-sm text-gray-500">By {article.username}</p>
    </div>
  );
};

export default GetOneArticle;
