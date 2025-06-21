import axios from "axios";
import { createContext, useContext, useState } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  useEffect(() => {
    getAllArticles();
  }, [handleLikePost, handleDislikePost]);
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
      navigate("/save");
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
    <ArticleContext.Provider value={{
        handleDislikePost, handleLikePost, handleSaveArticleSubmit, getAllArticles,
    }}>{children}</ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const articleContextValue = useContext(ArticleContext);
  if (!articleContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return articleContextValue;
};
