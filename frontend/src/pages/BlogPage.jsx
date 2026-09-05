import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BlogPage = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${id}`);

        setBlog(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar />
      </div>

      <article className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-8">
        <h1 className="text-4xl font-bold">{blog.title}</h1>

        <p className="mt-4 text-gray-500">By {blog.author}</p>

        <p className="text-sm text-gray-400">
          {new Date(blog.publishDate).toLocaleDateString()}
        </p>

        <p className="mt-8 whitespace-pre-wrap">{blog.body}</p>
      </article>
    </div>
  );
};

export default BlogPage;
