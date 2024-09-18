import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "../components/Body";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import Users from "../components/Users";
import Products from "../components/Products";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "shop",
        element: <Home />,
      },

      {
        path: "admin",
        element: <AdminPanel />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
