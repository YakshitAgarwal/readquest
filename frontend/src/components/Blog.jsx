import { Link } from "react-router-dom";
import UnlockButton from "./UnlockButton";

const Blog = ({ blog, user, unlockedBlogs, setUnlockedBlogs }) => {
  const isUnlocked = unlockedBlogs.includes(blog._id);

  const canAccess = user?.isAdmin || isUnlocked;

  const blogContent = (
    <>
      <h1 className="text-2xl font-semibold">{blog.title}</h1>

      <p className="text-gray-600">
        {blog.body.slice(0, 100)}
        {blog.body.length > 100 && "..."}
      </p>

      <div className="flex justify-between items-center">
        <p className="text-[20px] text-gray-500">
          {new Date(blog.publishDate).toLocaleDateString()}
        </p>

        {user?.isAdmin ? (
          <span className="text-green-600">Admin Access</span>
        ) : !user ? (
          <button
            onClick={(e) => e.preventDefault()}
            className="bg-blue-500 p-2 rounded"
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

  return canAccess ? (
    <Link
      to={`/blogs/${blog._id}`}
      className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md"
    >
      {blogContent}
    </Link>
  ) : (
    <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 opacity-90">
      {blogContent}
    </div>
  );
};

export default Blog;
