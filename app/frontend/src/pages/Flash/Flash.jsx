import React, { useState } from 'react'
import "./Flash.css"

const Flash = ({selectedQ}) => {
  console.log(selectedQ)
  const [activeIndex, setActiveIndex] = useState(null);

  const flip = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  return (
    <>
    <p>flash</p>
     <div className="summary-container">
            <ul>
              {selectedQ.map((q, index) => (
                <li key={index}>
                        <button onClick={() => flip(index)}>
                        {activeIndex !== index && <p>{q[1]}</p>}
                        {activeIndex === index && <p>{q[0]}</p>}
                        </button>
                    </li>
              ))}
            </ul>
        </div>
    </>
  )
}

export default Flash