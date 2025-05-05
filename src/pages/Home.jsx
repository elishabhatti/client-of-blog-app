import React from "react";

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "First Blog Post",
      content: "This is the content of the first blog post.",
      author: {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/40?img=1",
      },
      date: "May 1, 2025",
      readingTime: "3 min read",
    },
    {
      id: 2,
      title: "Second Blog Post",
      content: "Here is some more content for the second post.",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
      date: "May 3, 2025",
      readingTime: "5 min read",
    },
    {
      id: 3,
      title: "Third Blog Post",
      content: "Here is some more content for the third post.",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
      date: "May 2, 2025",
      readingTime: "15 min read",
    },
    {
      id: 4,
      title: "Fourth Blog Post",
      content: "Here is some more content for the fourth post.",
      author: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/40?img=2",
      },
      date: "May 2, 2025",
      readingTime: "4 min read",
    },
  ];

  const staffPicks = [
    {
      id: 1,
      title: "Can You Spot Fake News? Many Can’t When Scored on a Validated Test",
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

  return (
    <div className="flex px-30 py-10 gap-10 text-gray-800 bg-white min-h-screen">
      {/* Main Blog Content */}
      <div className="flex-1 w-[60%]">
        <h1 className="text-4xl font-bold mb-8">My Blog</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-5 p-4 border border-gray-200 rounded-md shadow-sm bg-white">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-gray-500">
                  {post.date} • {post.readingTime}
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-[30%]">
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
