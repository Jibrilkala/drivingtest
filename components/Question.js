import React, { useState } from 'react';

const QuizQuestion = ({ activeQuestion, question, selectedAnswerIndex, onAnswerSelected, totalQuestions }) => {
  const { questionText, answerOptions, hint } = question;
  const [showHint, setShowHint] = useState(false);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className='quiz-container bg-white p-4 mt-8 rounded'>
      <h2 className='text-lg text-black'>
        Question: {activeQuestion + 1}/{totalQuestions}
      </h2>
      <h3 className='text-black text-base pb-8'>{questionText}</h3>
      {answerOptions.map((answer, idx) => (
        <div key={idx} className='my-2'>
          <div onClick={() => onAnswerSelected(idx)}
            className={`cursor-pointer py-4 px-2 block border border-gray-300 ${selectedAnswerIndex === idx ? 'bg-green-500 text-yellow-200' : 'hover:bg-gray-200'}`}>
            <span style={{ fontSize: '20px' }}>{answer}</span>
          </div>
        </div>
      ))}
      <button onClick={toggleHint} className='py-2 px-4 mt-3 bg-gray-500 text-white rounded cursor-pointer'>Show/Hide Hint</button>
      {showHint && <p className='py-2'>{hint}</p>}
    </div>
  );
};

export default QuizQuestion;
