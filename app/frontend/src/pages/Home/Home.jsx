import './Home.css';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '../../components/index';

function Home({setSelectedQ}) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [cutFile, setCutFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [chapter, setChapter] = useState(""); 
  const [chapterList, setChapterList] = useState([]); 
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
    formData.append('file', selectedFile)
    formData.append('chapter', chapter)

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

    navigate('/flashcards');

  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setMessage("Loading..."); 
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('chapter', chapter); 

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
          <div className="summary-container">
          {summary ? <p>{summary}</p> : <p>{message}</p>}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
