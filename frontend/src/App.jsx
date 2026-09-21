import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserHome from "./pages/UserHome";
import NotFound from "./pages/NotFound";
import CreateBlog from "./pages/CreateBlog";
import AdminRoute from "./components/AdminRoute";
import BlogPage from "./pages/BlogPage";
import Sponsors from "./pages/Sponsors";
import CompanyHome from "./pages/CompanyHome";
import CreateTask from "./pages/CreateTask";
import CompanyRoute from "./components/CompanyRoute";

function App() {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");

    return userInfo ? JSON.parse(userInfo) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        {user?.isCompany ? (
          <Route
            path="/"
            element={<CompanyHome user={user} setUser={setUser} />}
          />
        ) : (
          <Route
            path="/"
            element={<UserHome user={user} setUser={setUser} />}
          />
        )}

        <Route
          path="/create-blog"
          element={
            <AdminRoute>
              <CreateBlog user={user} setUser={setUser} />
            </AdminRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <CompanyRoute>
              <CreateTask user={user} setUser={setUser} />
            </CompanyRoute>
          }
        />

        <Route
          path="/sponsors"
          element={<Sponsors user={user} setUser={setUser} />}
        />

        <Route
          path="/blogs/:id"
          element={<BlogPage user={user} setUser={setUser} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
