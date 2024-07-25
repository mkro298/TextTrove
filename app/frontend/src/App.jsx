import './App.css';
import React, {useState, useEffect} from 'react';
import {Home, Flash} from "./pages/index"; 
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from "react-router-dom"; 

const App = () => {

  const[flashcards, setFlashcards] = useState([]); 

  useEffect(() => {
    console.log(flashcards)
  }, [flashcards, setFlashcards])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact path = "/"
            element={<Home setSelectedQ={setFlashcards}/>}
          />
          <Route
            exact path = "/flashcards"
            element={<Flash selectedQ={flashcards}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
