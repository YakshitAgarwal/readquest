import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userInfo);

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
