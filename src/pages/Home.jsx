import React from "react";
import { Bookmark, MessageCircle, Eye, Star } from "lucide-react";

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "The Language of the Malaysian Palace",
      content: "Bahasa Istana: A way of speech reserved for royalty.",
      author: {
        name: "Zuphayri",
        avatar: "https://i.pravatar.cc/40?img=3",
      },
      date: "Apr 22",
      views: 264,
      comments: 13,
      thumbnailUrl:
        "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*Z4QsIrj9c7mOajq-", // Added thumbnail URL
    },
    {
      id: 2,
      title: "Understanding AI Ethics",
      content: "What are the ethical implications of artificial intelligence?",
      author: {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/40?img=5",
      },
      date: "Apr 24",
      views: 310,
      comments: 8,
      thumbnailUrl:
        "https://miro.medium.com/v2/resize:fit:2000/format:webp/0*DyZtxCM4swKMDe7Y", // Added thumbnail URL
    },
    {
      id: 3,
      title: "Exploring Quantum Computing",
      content: "Quantum computing will revolutionize technology—here’s how.",
      author: {
        name: "Ali Musa",
        avatar: "https://i.pravatar.cc/40?img=7",
      },
      date: "Apr 26",
      views: 178,
      comments: 5,
      thumbnailUrl:
        "https://miro.medium.com/v2/format:webp/1*tWlY7uF74XybqyRVFwIjyA.jpeg", // Added thumbnail URL
    },
    {
      id: 4,
      title: "The Rise of Indie Game Developers",
      content: "Indie developers are shaping the future of gaming.",
      author: {
        name: "Sara Lim",
        avatar: "https://i.pravatar.cc/40?img=8",
      },
      date: "Apr 27",
      views: 422,
      comments: 21,
      thumbnailUrl:
        "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*9c-L1OoddDbxOZEF", // Added thumbnail URL
    },
  ];

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

  return (
    <div className="flex max-w-7xl mx-auto px-4 py-6 gap-10">
      <div className="flex-1 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-start bg-white p-6 border-b border-gray-200 hover:bg-gray-50 transition"
          >
            <div className="flex-1 pr-4">
              <div className="text-sm text-gray-500 mb-1">
                <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                  LAB
                </span>
                In Language Lab by{" "}
                <span className="font-medium text-gray-700">
                  {post.author.name}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3">{post.content}</p>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> 264
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> 13
                </span>
                <span className="ml-auto flex items-center gap-4">
                  <button>
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button>
                    <span className="text-xl font-light">…</span>
                  </button>
                </span>
              </div>
            </div>
            <div className="w-48 h-28 flex-shrink-0">
              <img
                src={post.thumbnailUrl} // Use the thumbnail URL from the post object
                alt="Thumbnail"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
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
