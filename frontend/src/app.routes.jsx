import { createBrowserRouter } from "react-router";
import Register from "./Features/Auth/pages/Register";
import Login from "./Features/Auth/pages/Login";
import Protected from "./Features/Auth/components/Protected";
import Home from "./Features/Home/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
