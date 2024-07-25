import React, { useState } from 'react'
import "./Cards.css"

const Cards = ({question, answer, setIsFlipped, isFlipped}) => {

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
   <>
   <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          {question}
        </div>
        <div className="flashcard-back">
          {answer}
        </div>
      </div>
    </div>
   </>
  )
}

export default Cards