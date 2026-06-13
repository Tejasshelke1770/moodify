import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
} from "../services/auth.api";
import { useEffect } from "react";

const useAuth = () => {
  const userContext = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = userContext;

  const handleRegister = async (email, username, password) => {
    setLoading(true);
    const response = await registerUser(email, username, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    const response = await loginUser(email, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleGetme = async () => {
    setLoading(true);
    const response = await getMe();
    setUser(response.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setLoading(false);
  };

  useEffect(()=>{
    handleGetme()
  }, [])

  return {
    user,
    loading,
    setUser,
    setLoading,
    handleRegister,
    handleLogin,
    handleGetme,
    handleLogout,
  };
};

export default useAuth;
