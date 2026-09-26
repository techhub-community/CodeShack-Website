import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Blogimg from "../../assets/Blog.jpg";
import { blogs } from "../../data/blogs";

export const Blog = () => {
  const {blogId} = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  const categories = [
    "All",
    "Computer Science",
    "Machine Learning",
    "Miscellaneous",
  ]

  const filteredBlogs =
    selectedCategory === "Categories" || selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen text-white">
      <div className="relative h-96 sm:h-[500px] md:h-[600px] mb-12 overflow-hidden rounded-2xl">
        <img src={Blogimg} alt={""} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider"></h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold tracking-widest uppercase">
              FILTER BY
            </h2>
            <div className="w-3 h-3 bg-white"></div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-2 bg-transparent border border-white/30 rounded hover:border-white/50 transition-colors min-w-[200px] justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-gray-900 border border-white/30 rounded overflow-hidden z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-6 py-2 text-left hover:bg-white/10 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="group cursor-pointer"
            >
              <div
                className={`w-full h-52 ${blog.bgColor} rounded-sm mb-4 overflow-hidden flex items-center justify-center relative`}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold leading-tight text-white group-hover:text-gray-300 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {blog.subtitle}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium">{blog.author}</span>
                  <span>·</span>
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
