"use client"

import React, { useState } from 'react';
import quizData from '../data.json';
import QuizResult from '../../components/Result';
import QuizQuestion from '../../components/Question';
import ControlButtons from '../../components/ControlButtons';
import QuizReview from '../../components/Review';

const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState(Array(quizData[0].quizData.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  
  const questions = quizData[0].quizData;

  const onAnswerSelected = (idx) => {
    let newSelectedAnswers = [...selectedAnswerIndices];
    newSelectedAnswers[activeQuestion] = idx;
    setSelectedAnswerIndices(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const onQuestionClick = (idx) => {
    setActiveQuestion(idx);
    setShowResult(false);
    setReviewing(true);
  };

  const returnToResult = () => {
    setReviewing(false);
  }

  const result = {
    score: selectedAnswerIndices.reduce((total, current, idx) => (current === questions[idx].answerOptions.indexOf(questions[idx].correctAnswer) ? total + 1 : total), 0),
    correctAnswers: selectedAnswerIndices.filter((answerIndex, idx) => answerIndex === questions[idx].answerOptions.indexOf(questions[idx].correctAnswer)).length,
    wrongAnswers: selectedAnswerIndices.filter((answerIndex, idx) => answerIndex !== null && answerIndex !== questions[idx].answerOptions.indexOf(questions[idx].correctAnswer)).length,
    unanswered: selectedAnswerIndices.filter((answerIndex) => answerIndex === null).length,
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-black text-2xl'>Quiz Page</h1>
      {!showResult ? (
        <>
          <QuizQuestion activeQuestion={activeQuestion} question={questions[activeQuestion]} selectedAnswerIndex={selectedAnswerIndices[activeQuestion]} onAnswerSelected={onAnswerSelected} totalQuestions={questions.length} />
          {!reviewing && <ControlButtons activeQuestion={activeQuestion} selectedAnswerIndices={selectedAnswerIndices} nextQuestion={nextQuestion} prevQuestion={prevQuestion} totalQuestions={questions.length} />}
          {reviewing && <button onClick={returnToResult} className='py-2 px-4 mt-3 bg-gray-500 text-white rounded cursor-pointer'>Return to Result</button>}
        </>
      ) : (
        <QuizResult result={result} passMark={80} questions={questions} selectedAnswerIndices={selectedAnswerIndices} onQuestionClick={onQuestionClick} />
      )}
    </div>
  );
};

export default Page;
