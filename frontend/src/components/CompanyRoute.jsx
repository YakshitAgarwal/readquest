import { Navigate } from "react-router-dom";

const CompanyRoute = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userInfo);

  if (!user.isCompany) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CompanyRoute;
