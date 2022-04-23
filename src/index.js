import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/home/home'
import Leaderboard from './pages/leaderboard/leaderboard'
import Annulaire from './pages/annulaire/annulaire'
import Navbar from './components/navbar/navbar';

ReactDOM.render(
  <Router>
    <Navbar />
    <div className="containr">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/annulaire" element={<Annulaire />}/>
    </Routes>
    </div>
  </Router>,

  document.getElementById("root")
);
