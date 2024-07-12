import './App.css';
import React, { useState } from 'react';

function App() {
  const [summary, setSummary] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState([]); 
  const [chapter, setChapter] = useState(""); 
  const [message, setMessage] = useState(""); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setChapter(event.target.value);
  };

  const handleQs = async () => {
    if (!summary) {
      alert("Please generate summary first!"); 
      return; 
    }

    setMessage("Loading..."); 
    const formData = new FormData();
    formData.append('summary', summary); 

    try {
      const response = await fetch('/quiz', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setMessage("Loading..."); 
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('string', chapter); 

    try {
      const response = await fetch('/summ', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div className="App">
      <h1>Uploading Files</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" onChange={handleTextChange}/>
      <button onClick={handleFileUpload}>Generate Summary</button>
      <button onClick={handleQs}>Generate questions</button>
      {summary ? <p>{summary}</p> : <p>{message}</p>}
      {questions ? <p>{questions[1]}</p> : <p>{message}</p>}
    </div>
  );
}

export default App;
