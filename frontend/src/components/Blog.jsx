import { Link } from "react-router-dom";
import UnlockButton from "./UnlockButton";
import { useState } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";

const Blog = ({ blog, user, unlockedBlogs, setUnlockedBlogs, setUser }) => {
  const [showLogin, setShowLogin] = useState(false);

  const isUnlocked = unlockedBlogs.some(
    (id) => String(id) === String(blog._id),
  );

  const canAccess = user?.isAdmin || isUnlocked;

  const blogContent = (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] leading-[0.95] font-semibold">
          {blog.title}
        </h1>

        <p className="text-gray-600 text-[18px]">
          {blog.body.slice(0, 95)}
          {blog.body.length > 95 && "..."}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-[18px] text-gray-500">
          {new Date(blog.publishDate).toLocaleDateString()}
        </p>

        {user?.isAdmin ? (
          <span className="text-green-600">Admin Access</span>
        ) : !user ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
            className="bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-xl"
          >
            Login to unlock
          </button>
        ) : isUnlocked ? (
          <span className="text-green-600 font-medium">Unlocked</span>
        ) : (
          <UnlockButton
            blogId={blog._id}
            user={user}
            onUnlock={() => {
              setUnlockedBlogs((previousUnlockedBlogs) => [
                ...previousUnlockedBlogs,
                blog._id,
              ]);
            }}
          />
        )}
      </div>
    </>
  );

  return (
    <>
      {canAccess ? (
        <Link
          to={`/blogs/${blog._id}`}
          className="flex flex-col justify-between gap-14 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md"
        >
          {blogContent}
        </Link>
      ) : (
        <div className="flex flex-col justify-between gap-14 rounded-2xl border border-gray-200 bg-white p-6 opacity-90">
          {blogContent}
        </div>
      )}

      {/* Modal is completely outside the card */}
      {showLogin && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative w-[400px] rounded-2xl bg-white p-6 opacity-100">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4"
            >
              <X
                size={28}
                className="rounded-full border border-[#4b4b4b] p-1 cursor-pointer"
              />
            </button>

            <Modal closeModal={() => setShowLogin(false)} setUser={setUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
