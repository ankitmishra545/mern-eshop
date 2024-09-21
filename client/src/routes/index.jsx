import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import ProductInfo from "../pages/ProductInfo";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";
import Products from "../pages/Products";
import Users from "../pages/Users";

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
