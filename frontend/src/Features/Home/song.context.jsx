import { createContext, useState } from "react";

export const SongContext = createContext();

const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, setLoading, loading }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;
