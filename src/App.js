import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./screen/landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
      </Routes>
    </>
  );
}

export default App;
