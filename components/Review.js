import React from 'react';

const QuizReview = ({ question, idx, selectedAnswerIndices, showFilter, onQuestionClick }) => {
  const selectedAnswer = selectedAnswerIndices[idx];
  const isCorrect = selectedAnswer === question.answerOptions.indexOf(question.correctAnswer);
  const isUnanswered = selectedAnswer === null;

  if (showFilter !== 'all' && ((showFilter === 'correct' && !isCorrect) || (showFilter === 'incorrect' && (isCorrect || isUnanswered)) || (showFilter === 'unanswered' && !isUnanswered))) {
    return null;
  }

  return (
    <div className='my-4 p-4 bg-gray-100 rounded cursor-pointer' onClick={() => onQuestionClick(idx)}>
      <p className='font-bold'>Question {idx + 1}</p>
      <p>{question.questionText}</p>
      {isUnanswered ? (
        <p>Your answer: Unanswered</p>
      ) : isCorrect ? (
        <>
          <p className='text-green-500'>You answered this correctly.</p>
          <p>{question.answerOptions[selectedAnswer]}</p>
        </>
      ) : (
        <>
          <p className='text-red-500'>You answered ({question.answerOptions[selectedAnswer]}) which is wrong.</p>
          {question.answerOptions.map((option, index) => (
            <p key={index} className={option === question.correctAnswer ? 'text-green-500' : 'text-red-500'}>{option} {option === question.correctAnswer ? '✅ (correct)' : (index === selectedAnswer ? '❌ (your answer)' : '❌')}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default QuizReview;
