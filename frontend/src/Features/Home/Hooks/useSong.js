import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSongByMood } from "../services/song.api";

const useSong = () => {
  const { song, setSong, setLoading, loading } = useContext(SongContext);

  const getSong = async (mood) => {
    setLoading(true);
    const data = await getSongByMood(mood);
    setSong(data.song);
    setLoading(false);
  };

  return { song, loading, getSong };
};

export default useSong;
