import FaceExpression from "../../Expressions/components/FaceExpression.jsx";
import Player from "../components/Player.jsx";
import useSong from "../hooks/useSong.js";

const Home = () => {
  const { getSong } = useSong();
  return (
    <>
      <FaceExpression getSong={(expression) => getSong(expression)} />
      <Player />
    </>
  );
};

export default Home;
