import './Home.css';
import React, { useState, useEffect } from 'react';
import { Search } from '../../components/index';

function Home() {
  const [summary, setSummary] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [cutFile, setCutFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQ, setSelectedQ] = useState([]);
  const [chapter, setChapter] = useState(""); 
  const [chapterList, setChapterList] = useState([]); 
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [message, setMessage] = useState(""); 
  const [sMessage, setSMessage] = useState(""); 

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);

    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const response = await fetch('/chapters', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        setMessage("Network response was not ok"); 
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); 
      setChapterList(data.chapters);
    } catch (error) {
      setMessage("There was an error uploading the file!"); 
      console.error('There was an error uploading the file!', error);
    }
  };


  const handleQs = async () => {
    setSMessage("Loading..."); 
    const formData = new FormData();
    formData.append('file', selectedFile); 
    formData.append('chapter', chapter[1])

    try {
      const response = await fetch('/quiz', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        setSMessage("Network response was not ok"); 
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setSelectedQ(data.selected); 
      console.log(data)
    } catch (error) {
      setSMessage('There was an error uploading the file!'); 
      console.error('There was an error uploading the file!', error);
    }

    try {
      const response = await fetch('/delete', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleted file', error)
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
    formData.append('chapter', chapter[1]); 

    try {
      const response = await fetch('/summ', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        setMessage("Network response was not ok"); 
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSummary(data.summary);
      setCutFile(data.title); 
    } catch (error) {
      setMessage("There was an error uploading the file!"); 
      console.error('There was an error uploading the file!', error);
    }

    try {
      const response = await fetch('/delete', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleted file', error)
    }
  };

  return (
    <div className="App">
      <h1>TextTrove</h1>
      <div className="content-container">
        <div className="input-container">
          <input type="file" onChange={handleFileChange} />
          <Search chapters={chapterList} setChapter={setChapter}/>
          <button onClick={handleFileUpload}>Generate Summary</button>
          <button onClick={handleQs}>Generate Questions</button>
        </div>
        <div className="summary-container">
          {summary ? <p>{summary}</p> : <p>{message}</p>}
          {selectedQ.length > 0 ? (
            <ul>
              {selectedQ.map((q, index) => (
                <p key={index}>{q[1]}</p>
              ))}
            </ul>
          ) : (
            <p>{sMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
