"use client";

import React, { useState, useEffect } from "react";
import quizData from "../data.json";
import QuizResult from "../../components/Result.js"; // import the QuizResult component
import QuizQuestion from "../../components/Question";
import ControlButtons from "../../components/ControlButtons";


const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [review, setReview] = useState(false);

  const questions = quizData[0].quizData;
  const { answerOptions, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    if (!selectedAnswers.some((ans) => ans.questionIndex === activeQuestion)) {
      setSelectedAnswers([...selectedAnswers, { questionIndex: activeQuestion, selectedAnswer: null }]);
      setUserAnswers([...userAnswers, null]);
    }
  }, [activeQuestion]);

  const onAnswerSelected = (idx) => {
    setSelectedAnswers(selectedAnswers.map((item) => (item.questionIndex === activeQuestion ? { ...item, selectedAnswer: answerOptions[idx] === correctAnswer } : item)));
    setSelectedAnswerIndex(idx);
    setUserAnswers(userAnswers.map((item, index) => (index === activeQuestion ? answerOptions[idx] : item)));
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  };

  const onQuestionClick = (idx) => {
    setActiveQuestion(idx);
    setShowResult(false);
    setReview(true);
  };

  const showCorrectAnswers = () => {
    setShowCorrect(true);
  };

  const showWrongAnswers = () => {
    setShowCorrect(false);
  };

  const result = {
    score: selectedAnswers.reduce((total, current) => (current.selectedAnswer ? total + 1 : total), 0),
    correctAnswers: selectedAnswers.filter((answer) => answer.selectedAnswer).length,
    wrongAnswers: selectedAnswers.filter((answer) => answer.selectedAnswer === false).length,
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-black text-2xl'>Quiz Page</h1>
      {!showResult ? (
        <>
          <QuizQuestion activeQuestion={activeQuestion} question={questions[activeQuestion]} selectedAnswerIndex={selectedAnswerIndex} onAnswerSelected={onAnswerSelected} totalQuestions={questions.length} />
          {!review && <ControlButtons activeQuestion={activeQuestion} nextQuestion={nextQuestion} prevQuestion={prevQuestion} totalQuestions={questions.length} />}
          {review && <button onClick={() => setShowResult(true)}>Back to Result</button>}
        </>
      ) : (
        <QuizResult result={result} passMark={80} questions={questions} answerResults={selectedAnswers.map((item) => item.selectedAnswer)} userAnswers={userAnswers} onQuestionClick={onQuestionClick} showCorrectAnswers={showCorrectAnswers} showWrongAnswers={showWrongAnswers} showCorrect={showCorrect} />
      )}
    </div>
  );
};

export default Page;
