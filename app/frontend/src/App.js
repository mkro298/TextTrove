import './App.css';
import React, { useState } from 'react';

function App() {
  const [summary, setSummary] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState([]); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

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
  };

  return (
    <div className="App">
      <h1>Uploading Files</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>
      {summary ? <p>{summary}</p> : <p>Loading...</p>}
      {questions ? <p>{questions[1]}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
