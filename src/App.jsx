import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Search from "./components/Search";

const App = () => {
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/search" element={<Search />} />
            
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
