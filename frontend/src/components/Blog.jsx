import { Link } from "react-router-dom";

const Blog = ({ blog, user }) => {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md"
    >
      <h1 className="text-2xl font-semibold">{blog.title}</h1>

      <p className="mt-2 text-sm text-gray-500">
        {new Date(blog.publishDate).toLocaleDateString()}
      </p>
      {user ? <div>$0.01</div> : <div>Login to unlock</div>}
    </Link>
  );
};

export default Blog;
