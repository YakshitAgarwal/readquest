import { Link } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import AuthModal from "./AuthModal";
import PayModal from "./PayModal";

const Blog = ({ blog, user, unlockedBlogs, setUnlockedBlogs, setUser }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  const isUnlocked = unlockedBlogs.some(
    (id) => String(id) === String(blog._id),
  );

  const canAccess = user?.isAdmin || isUnlocked;

  const blogContent = (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-[44px] leading-[1] font-semibold">{blog.title}</h1>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPayModal(true);
            }}
            className="bg-blue-500 py-2 px-4 rounded-xl text-white cursor-pointer"
          >
            Unlock
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {canAccess ? (
        <Link
          to={`/blogs/${blog._id}`}
          className="flex flex-col justify-between gap-16 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md"
        >
          {blogContent}
        </Link>
      ) : (
        <div className="flex flex-col justify-between gap-16 rounded-2xl border border-gray-200 bg-white p-6 opacity-90">
          {blogContent}
        </div>
      )}
      {showLogin && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative w-[400px] rounded-2xl bg-white p-6">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4"
            >
              <X
                size={28}
                className="rounded-full border border-[#4b4b4b] p-1 cursor-pointer"
              />
            </button>
            <AuthModal
              closeModal={() => setShowLogin(false)}
              setUser={setUser}
            />
          </div>
        </div>
      )}
      {showPayModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative w-[400px] rounded-2xl bg-white p-6">
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute right-4 top-4"
            >
              <X
                size={28}
                className="rounded-full border border-[#4b4b4b] p-1 cursor-pointer"
              />
            </button>
            <PayModal
              blogId={blog._id}
              user={user}
              onClose={() => setShowPayModal(false)}
              onUnlock={() => {
                setUnlockedBlogs((previousUnlockedBlogs) => [
                  ...previousUnlockedBlogs,
                  blog._id,
                ]);
                setShowPayModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
