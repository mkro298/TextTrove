import React from 'react'
import "./Flash.css"

const Flash = ({selectedQ}) => {
  console.log(selectedQ)
  return (
    <>
    <p>flash</p>
     <div className="summary-container">
            <ul>
              {selectedQ.map((q, index) => (
                <p key={index}>{q[1]}</p>
              ))}
            </ul>
        </div>
    </>
  )
}

export default Flash