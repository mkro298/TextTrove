import React, {useState} from 'react'

const Search = ({chapters}) => {
    const [query, setQuery] = useState(""); 
  return (
    <div className='search'>
        <input type='text' onChange={e => setQuery(e.target.value)}></input>
    </div>
  )
}

export default Search