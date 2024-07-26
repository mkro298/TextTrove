import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './Search.css';

const Search = ({ chapters, setChapter }) => {
  const [query, setQuery] = useState(""); 
  const [filteredChapters, setFilteredChapters] = useState([]);

  const fetchData = async (value) => {
    if (value.trim() === "") {
      setFilteredChapters([]);
      return;
    }

    const filtered = chapters
      .filter((chapter) => chapter[1].toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    setFilteredChapters(filtered);
  }

  const handleChange = (value) => {
    setQuery(value);
    fetchData(value);
  }

  const pickChapter = (index) => {
    setChapter(filteredChapters[index][1]);
    console.log(filteredChapters[index][1]);
  }

  return (
    <div className='search-container'>
      <div className='search-bar'>
        <FaSearch id="search-icon" />
        <input 
          className='search-input'
          placeholder="Type here to search for a chapter..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {filteredChapters.length > 0 && (
        <ul className='search-results'>
          {filteredChapters.map((chapter, index) => (
            <li key={index} className='search-item'>
              <button className='search-button' onClick={() => pickChapter(index)}>
                {chapter[1]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search;
