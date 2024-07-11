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

      {(typeof summary.summary == 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <p>{summary.summary}</p>
      )}

    </div>
  );
}

export default App;
