import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreateBlog from "./pages/CreateBlog";
import AdminRoute from "./components/AdminRoute";
import BlogPage from "./pages/BlogPage";

function App() {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");

    return userInfo ? JSON.parse(userInfo) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />

        <Route
          path="/create-blog"
          element={
            <AdminRoute>
              <CreateBlog />
            </AdminRoute>
          }
        />

        <Route path="/blogs/:id" element={<BlogPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
