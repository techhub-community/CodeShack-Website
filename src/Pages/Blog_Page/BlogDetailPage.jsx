import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogs } from "../../data/blogs";

export const BlogDetailPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  // Find blog by slug
  const blog = blogs.find((b) => b.slug === blogId);

  // Handle invalid slug
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-tech-grid">
        <h1 className="text-3xl font-bold mb-4">Blog not found</h1>
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 px-6 py-3 border border-white/40 hover:bg-white hover:text-black transition"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">

      {/* HERO */}
      <div className="relative h-96 sm:h-[500px] md:h-[600px] mb-12 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <p className="uppercase tracking-widest text-sm text-gray-300 mb-4">
              {blog.category}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <button
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </button>

        <article className="prose prose-invert max-w-none">
          {blog.content.map((block, index) => (
            <p key={index}>{block}</p>
          ))}
        </article>

        {/* AUTHOR */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400">Written by</p>
          <p className="font-semibold text-lg">{blog.author}</p>
        </div>
      </div>
    </div>
  );
};
