// import React from 'react';

// const QuizResult = ({ result, passMark, questions, answerResults, onQuestionClick, showCorrectAnswers, showWrongAnswers, showCorrect }) => {
//   return (
//     <div className='quiz-container bg-white p-4 mt-8 rounded'>
//       <h3 className='text-lg font-bold'>Results</h3>
//       <h3 className='text-lg'>Overall Score: <span className='font-bold'>{((result.score / questions.length) * 100).toFixed(2)}%</span></h3>
//       <p className='py-2'>
//         Pass Mark: <span className='font-bold'>{passMark}%</span>
//       </p>
//       <p className='py-2'>
//         You have answered <span className='font-bold'>{result.correctAnswers}</span> out of <span className='font-bold'>{questions.length}</span> questions correctly.
//       </p>
//       <div className='my-4 flex space-x-4'>
//         <button onClick={showCorrectAnswers} className='py-2 px-4 bg-green-500 text-white rounded cursor-pointer'>Correct</button>
//         <button onClick={showWrongAnswers} className='py-2 px-4 bg-red-500 text-white rounded cursor-pointer'>Wrong</button>
//       </div>
//       {answerResults.map((item, idx) => (
//         (showCorrect && item) || (!showCorrect && !item) ? (
//           <div key={idx} className='my-4 p-4 bg-gray-100 rounded' onClick={() => onQuestionClick(idx)}>
//             <p className='font-bold'>Question {idx + 1}/{questions.length}</p>
//             <p>{questions[idx].questionText}</p>
//             {questions[idx].answerOptions.map((option, index) => (
//               <p key={index} className={option === questions[idx].correctAnswer ? 'text-green-500' : 'text-red-500'}>{option} {option === questions[idx].correctAnswer ? '✓' : '❌'}</p>
//             ))}
//           </div>
//         ) : null
//       ))}
//       <button onClick={() => window.location.reload()} className='py-2 px-4 mt-4 bg-blue-500 text-white rounded cursor-pointer'>Restart</button>
//     </div>
//   );
// };

// export default QuizResult;



// QuizResult.js


import React from 'react';

const QuizResult = ({ result, passMark, questions, answerResults, userAnswers, onQuestionClick, showCorrectAnswers, showWrongAnswers, showCorrect }) => {
  return (
    <div className='quiz-container bg-white p-4 mt-8 rounded'>
      <h3 className='text-lg font-bold'>Results</h3>
      <h3 className='text-lg'>Overall Score: <span className='font-bold'>{((result.score / questions.length) * 100).toFixed(2)}%</span></h3>
      <p className='py-2'>
        Pass Mark: <span className='font-bold'>{passMark}%</span>
      </p>
      <p className='py-2'>
        You have answered <span className='font-bold'>{result.correctAnswers}</span> out of <span className='font-bold'>{questions.length}</span> questions correctly.
      </p>
      <div className='my-4 flex space-x-4'>
        <button onClick={showCorrectAnswers} className='py-2 px-4 bg-green-500 text-white rounded cursor-pointer'>Correct</button>
        <button onClick={showWrongAnswers} className='py-2 px-4 bg-red-500 text-white rounded cursor-pointer'>Wrong</button>
      </div>
      {answerResults.map((item, idx) => (
        (showCorrect && item) || (!showCorrect && !item) ? (
          <div key={idx} className='my-4 p-4 bg-gray-100 rounded' onClick={() => onQuestionClick(idx)}>
            <p className='font-bold'>Question {idx + 1}/{questions.length}</p>
            <p>{questions[idx].questionText}</p>
            {item ?
              <p className='text-green-500'>You answered this correctly.</p> :
              <p className='text-red-500'>You answered this wrong. Your answer was {userAnswers[idx]}.</p>
            }
            {questions[idx].answerOptions.map((option, index) => (
              <p key={index} className={option === questions[idx].correctAnswer ? 'text-green-500' : 'text-red-500'}>{option} {option === questions[idx].correctAnswer ? '✓' : '❌'}</p>
            ))}
          </div>
        ) : null
      ))}
      <button onClick={() => window.location.reload()} className='py-2 px-4 mt-4 bg-blue-500 text-white rounded cursor-pointer'>Restart</button>
    </div>
  );
};

export default QuizResult;
