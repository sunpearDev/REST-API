import React from "react";
import "./App.css";
import Navbar from './components/Navbar.js'
import HomePage from './pages/HomePage.js'

function App() {
  return (
    <div>
      <Navbar />
      <br />
      <div className="container">
       <HomePage></HomePage>
      </div>
    </div>
  );
}

export default App;
