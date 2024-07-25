import React, { useState } from 'react'
import "./Flash.css"
import {Cards} from "../../components/index.js"

const Flash = ({selectedQ}) => {
  console.log(selectedQ)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); 

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      setIsFlipped(false)
    }
  }

  const next = () => {
    if (activeIndex < selectedQ.length - 1) {
      setActiveIndex(activeIndex + 1)
      setIsFlipped(false)
    }
  }

  return (
    <>
    <div className='text-flash'>
      <p>Flash Cards</p>
    </div>
     <div className="summary-container">
      <button onClick={prev}>Previous</button>
      <div className='card'>
      <Cards question={selectedQ[activeIndex][1]} answer={selectedQ[activeIndex][0]} setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
      </div>
      <button onClick={next}>Next</button>
    </div>
    </>
  )
}

export default Flash