import React, { act, useState } from 'react'
import "./Flash.css"
import {Cards} from "../../components/index.js"

const Flash = ({selectedQ}) => {
  console.log(selectedQ)
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const next = () => {
    if (activeIndex < selectedQ.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <>
    <p>flash</p>
     <div className="summary-container">
      <button onClick={prev}>Prev</button>
      <div className='card'>
      <Cards question={selectedQ[activeIndex][1]} answer={selectedQ[activeIndex][0]} />
      </div>
      <button onClick={next}>Next</button>
    </div>
    </>
  )
}

export default Flash