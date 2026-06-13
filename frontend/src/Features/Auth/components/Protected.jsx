import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user, loading);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
