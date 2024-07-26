import './Home.css';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '../../components/index';
import { Oval } from 'react-loader-spinner';

function Home({setSelectedQ}) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [chapter, setChapter] = useState(""); 
  const [chapterList, setChapterList] = useState([]); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 

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
    setLoading(true); 
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('chapter', chapter)

    try {
      const response = await fetch('/quiz', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedQ(data.selected); 
    } catch (error) {
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
     <div className='text-flash'>
      <p>Text Trove</p>
      </div>
      <div className="content-container">
        <div className="input-container">
          <input type="file" onChange={handleFileChange} />
          <Search chapters={chapterList} setChapter={setChapter}/>
          <button onClick={handleFileUpload}>Generate Summary</button>
          <button onClick={handleQs}>Generate Questions</button>
        </div>
          <div className="summary-container">
          {summary ? <p>{summary}</p> : <p>{message}</p>}
          </div>
          {loading ? (<div className="modal-overlay">
            <div className="spinner-container">
        <Oval
          height={80}
          width={80}
          color="grey"
          visible={loading}
          ariaLabel='oval-loading'
          secondaryColor="gray"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>) : (<div></div>)}
      </div>
    </div>
  );
}

export default Home;
