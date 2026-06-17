import { RouterProvider } from "react-router";
import router from "./app.routes";
import "./Features/shared/styles/global.scss";
import AuthContextProvider from "./Features/Auth/auth.context";
import SongContextProvider from "./Features/Home/song.context";

const App = () => {
  return (
    <AuthContextProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthContextProvider>
  );
};

export default App;
