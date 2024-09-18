import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../store/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <Header />
      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
