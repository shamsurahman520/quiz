"use client";
import React, { useState } from "react";
import data from "../app/quiz-data.js/data";
import { Progress } from "@/components/ui/progress";

const QuizApp = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const { questions } = data;
  const { statement, options, answer } = questions[activeQuestion];

  const onAnswerSelected = (option) => {
    const isCorrect = option.id === answer;

    setResult((prev) =>
      isCorrect
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (activeQuestion !== questions.length - 1) {
      setTimeout(() => setActiveQuestion((prev) => prev + 1), 500);
    } else {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  // Progress calculation
  const progressValue = ((activeQuestion + 0) / questions.length) * 100;

  return (
    <>
      <div>
        <h2 className="text-[#000000] text-xl font-bold text-center">
          Quiz Total Questions: {activeQuestion + 1}/{questions.length}
        </h2>
      </div>

      <div className="max-w-[740px] mx-auto p-2 mb-1 mt-1 bg-black rounded">
        {!showResult ? (
          <div className="bg-[#f8f8f8] p-2 mt-2 rounded-md">
            <h3 className="text-[#000105] flex items-center justify-center gap-2 max-auto text-xl font-serif font-medium pb-2 text-center">
              <div>{`Q ${activeQuestion + 1}:`}</div>
              {statement}
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4 ">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  className="mx-auto "
                  onClick={() => onAnswerSelected(option)}
                >
                  <div
                    className="w-[150px] h-[150px] flex flex-col justify-center items-center 
                    rounded-full cursor-pointer hover:scale-110 hover:ring-4 hover:ring-cyan-600 duration-500 "
                  >
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <p className="text-center mt-1 px-2 p-1 rounded-md text-black font-bold">
                    {option.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex justify-center">
              <Progress
                value={progressValue}
                className="w-[90%] h-3 bg-blue-300 transition-all duration-500"
              />
            </div>
          </div>
        ) : (
          <div className="bg-[#f8f8f8] p-4 mt-4 rounded-md">
            <div className=" w-1/2 mx-auto translate-x-1/4 leading-tight">
            <h3 className="text-[#000105] text-2xl font-bold">Results</h3>
            <p className="font-bold text-xl leading-loose">
              Total Questions: {questions.length}
            </p>
            <p className="font-bold text-xl text-green-600">
              Score: {result.score}
            </p>
            <p className="font-bold text-xl text-blue-600">
              Correct Answers: {result.correctAnswers}
            </p>
            <p className="font-bold text-xl text-red-600">
              Wrong Answers: {result.wrongAnswers}
            </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full mt-4 py-3 px-6 bg-slate-600 font-bold text-[#f8f8f8] rounded-md hover:bg-slate-800"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizApp;
