import React, { useState } from 'react';
import axios from 'axios';

const WriteArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    subtitle: '',
    description: '',
    duration: 0,
    rating: 0,
    completionStatus: false
  });


  const handleArticleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post('/api/users', user);
      
      const articleResponse = await axios.post('/api/articles', {
        ...article,
        comments: comment ? [{
          text: comment,
          user: userResponse.data._id
        }] : []
      });

      console.log('Article created:', articleResponse.data);
      // Reset form or redirect
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  return (
    <div className="max-w-2xl pt-30 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Article Fields */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Article Information</h2>
          <div>
            <label className="block">Title*</label>
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleArticleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block">Subtitle*</label>
            <input
              type="text"
              name="subtitle"
              value={article.subtitle}
              onChange={handleArticleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block">Description*</label>
            <textarea
              name="description"
              value={article.description}
              onChange={handleArticleChange}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={article.duration}
                onChange={handleArticleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="w-1/2">
              <label className="block">Rating</label>
              <input
                type="number"
                name="rating"
                value={article.rating}
                onChange={handleArticleChange}
                min="0"
                max="5"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default WriteArticle;