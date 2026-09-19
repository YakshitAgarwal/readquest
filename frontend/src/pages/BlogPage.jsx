import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BlogPage = ({ user, setUser }) => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/blogs/${id}`, config);

        setBlog(data);
      } catch (error) {
        console.log(error.response?.data);

        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] p-6 px-48 mb-10">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>

      <article className="mx-auto mt-10 rounded-2xl bg-white p-8 w-full">
        <h1 className="text-[68px] font-bold">{blog.title}</h1>

        <p className="mt-4 text-[28px] text-gray-500">By {blog.author}</p>

        <p className="text-[18px] text-gray-400">
          {new Date(blog.publishDate).toLocaleDateString()}
        </p>

        <p className="mt-8 text-[20px] whitespace-pre-wrap">{blog.body}</p>
      </article>
    </div>
  );
};

export default BlogPage;
