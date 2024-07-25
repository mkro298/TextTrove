import './App.css';
import React from 'react';
import {Home, Flash} from "./pages/index"; 
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from "react-router-dom"; 

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact path = "/"
            element={<Home />}
          />
          <Route
            exact path = "/flashcards"
            element={<Flash />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
