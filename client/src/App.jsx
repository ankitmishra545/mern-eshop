import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default App;
