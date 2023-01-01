import React, { useState } from "react";
import "./App.css";
import FullContainer from "./Container/FullContainer/FullContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <FullContainer />
      <ToastContainer />
    </div>
  );
}

export default App;
