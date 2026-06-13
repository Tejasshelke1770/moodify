import { RouterProvider } from "react-router";
import router from "./app.routes";
import "./Features/shared/styles/global.scss";
import AuthContextProvider from "./Features/Auth/auth.context";

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
