const Blog = ({ blog }) => {
  return (
    <article>
      <h1>{blog.title}</h1>
      <p>By {blog.author}</p>
      <p>{new Date(blog.publishDate).toLocaleDateString()}</p>
      <p>{blog.body}</p>
    </article>
  );
};
