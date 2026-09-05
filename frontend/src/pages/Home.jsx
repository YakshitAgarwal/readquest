import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs");

        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>

      <main className="mx-auto mt-10 w-full max-w-5xl">
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Blog key={blog._id} blog={blog} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
