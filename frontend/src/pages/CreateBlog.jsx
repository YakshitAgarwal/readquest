import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(blogData);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/blogs/create", blogData, config);

      localStorage.setItem("blogInfo", JSON.stringify(data));

      alert("Blog created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6 gap-10">
      <div className="flex justify-center">
        <Navbar />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-[600px] flex-col gap-6 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm"
        >
          <h1 className="text-3xl font-semibold text-center">Create Blog</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title for your blog"
              value={blogData.title}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-sm font-medium">
              Body
            </label>

            <textarea
              id="body"
              name="body"
              placeholder="Enter the contents for your blog"
              value={blogData.body}
              onChange={handleChange}
              required
              rows={10}
              className="resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-xl bg-black px-5 py-3 text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
