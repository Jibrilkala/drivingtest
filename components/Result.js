import React, { useState } from 'react';
import QuizReview from './Review';

const QuizResult = ({ result, passMark, questions, selectedAnswerIndices, onQuestionClick }) => {
  const [showFilter, setShowFilter] = useState('all');
  const scorePercentage = ((result.score / questions.length) * 100).toFixed(2);

  const filteredQuestions = questions.filter((_, idx) => {
    if (showFilter === 'correct') return selectedAnswerIndices[idx] === questions[idx].answerOptions.indexOf(questions[idx].correctAnswer);
    if (showFilter === 'incorrect') return selectedAnswerIndices[idx] !== null && selectedAnswerIndices[idx] !== questions[idx].answerOptions.indexOf(questions[idx].correctAnswer);
    if (showFilter === 'unanswered') return selectedAnswerIndices[idx] === null;
    return true;
  });

  return (
    <div className='quiz-container bg-white p-4 mt-8 rounded'>
      <h3 className='text-lg font-bold'>Results</h3>
      <h3 className='text-lg'>Your Score: <span className='font-bold'>{scorePercentage}%</span></h3>
      <p className='py-2'>
        Pass Mark: <span className='font-bold'>{passMark}%</span>
      </p>
      <p className='py-2'>
        You have answered <span className='font-bold'>{result.correctAnswers}</span> out of <span className='font-bold'>{questions.length}</span> questions correctly.
      </p>
      <p className='py-2'>
        You have answered <span className='font-bold'>{result.wrongAnswers}</span> questions incorrectly.
      </p>
      <p className='py-2'>
        You skipped <span className='font-bold'>{result.unanswered}</span> questions.
      </p>
      <p className={`font-bold text-lg ${scorePercentage >= passMark ? 'text-green-500' : 'text-red-500'}`}>
        {scorePercentage >= passMark ? 'Passed' : 'Failed'}
      </p>
      <div className='my-4 flex space-x-4'>
        <button onClick={() => setShowFilter('all')} className='py-2 px-4 bg-blue-500 text-white rounded cursor-pointer'>All</button>
        <button onClick={() => setShowFilter('correct')} className='py-2 px-4 bg-green-500 text-white rounded cursor-pointer'>Correct</button>
        <button onClick={() => setShowFilter('incorrect')} className='py-2 px-4 bg-red-500 text-white rounded cursor-pointer'>Incorrect</button>
        <button onClick={() => setShowFilter('unanswered')} className='py-2 px-4 bg-yellow-500 text-white rounded cursor-pointer'>Skipped</button>
      </div>
      {filteredQuestions.map((question, idx) => (
        <QuizReview key={idx} question={question} idx={idx} selectedAnswerIndices={selectedAnswerIndices} showCorrect={selectedAnswerIndices[idx] === question.answerOptions.indexOf(question.correctAnswer)} onQuestionClick={onQuestionClick} />
      ))}
      <button onClick={() => window.location.reload()} className='py-2 px-4 mt-4 bg-blue-500 text-white rounded cursor-pointer'>Restart</button>
    </div>
  );
};

export default QuizResult;
