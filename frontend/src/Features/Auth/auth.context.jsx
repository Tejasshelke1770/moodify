import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
