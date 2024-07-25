import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"

const Search = ({chapters, setChapter}) => {
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
      setQuery(value) 
      fetchData(value)
  }

  const pickChapter = (index) => {
    setChapter(filteredChapters[index][1]); 
    console.log(filteredChapters[index][1]); 
  }
  return (
    <div className='search'>
      <FaSearch id="search-ison" /> 
            <input 
            placeholder="Type here to search for a chapter..."
            value={query} 
            onChange={(e) => handleChange(e.target.value)}/> 
             <ul>
                {filteredChapters.map((chapter, index) => (
                    <li key={index}>
                        <button onClick={() => pickChapter(index)}>
                         {chapter[1]}
                        </button>
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default Search