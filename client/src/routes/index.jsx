import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import Users from "../components/Users";
import Products from "../components/Products";
import ProductInfo from "../pages/ProductInfo";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "product-info/:productId",
        element: <ProductInfo />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "admin-panel",
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
