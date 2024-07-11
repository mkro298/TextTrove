import './App.css';
import React,{useState, useEffect} from 'react';

function App() {
  const [summary, setSummary] = useState([{}])

  useEffect(() => {
    fetch("/summ").then(
      res => res.json()
    ).then(
      summary => {
        setSummary(summary)
        console.log(summary)
      }
    )
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
