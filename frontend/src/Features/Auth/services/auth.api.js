import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const registerUser = async (email, username, password) => {
  const response = await api.post("/api/auth/register", {
    email,
    username,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/get-me");
  return response.data;
};
