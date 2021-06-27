import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import QuestionArea from "./components/QuestionArea";
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(false);

  const startQuiz = () => {
    setStart(true);
    setTimer(true);
  };
  function refreshPage() {
    window.location.reload(true);
  }
  const Completionist = () => (
    <div className="text-center bigfont text-white">
      <span>The quiz is over!</span>
      <br></br>
      <span>Your score is {score}</span>
      <br></br>
      <button
        className="p-4 font-semibold rounded shadow bg-red-500 container mt-7"
        onClick={refreshPage}
      >
        Take the Quiz again
      </button>
    </div>
  );
  const renderer = ({ hours, minutes, seconds, completed }) => {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (completed) {
      setStart(false);
      return <Completionist />;
    } else {
      return (
        <div className="text-center font">
          <span>
            <span>
              {hours} : {minutes} : {seconds}
            </span>
          </span>
        </div>
      );
    }
  };
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const questions = data.results.map(question => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, []);
  const handleAnswer = answer => {
    if (!showAnswers) {
      // Prevent double answers
      if (answer === questions[curIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true);
  };
  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurIndex(curIndex + 1);
  };
  return (
    <div>
      {!start && !timer ? (
        <div>
          <h1 className="text-5xl text-white font-bold text-center">
            Welcome to QUIZ APP
          </h1>
          <br></br>
          <h2 className="text-2xl text-white font-bold text-center">
            You have ten seconds for each question
          </h2>
          <button
            className="p-4 font-semibold rounded shadow bg-green-500 container mt-7"
            onClick={startQuiz}
          >
            START QUIZ
          </button>
        </div>
      ) : (
        <div className="questions">
          {start ? (
            <Countdown date={Date.now() + 10000} renderer={renderer} />
          ) : (
            <Completionist />
          )}
          {questions.length > 0 && start ? (
            <div className="container">
              {curIndex >= questions.length ? (
                <Countdown date={Date.now()} renderer={renderer} />
              ) : (
                <React.Fragment>
                  <QuestionArea
                    data={questions[curIndex]}
                    showAnswers={showAnswers}
                    handleAnswer={handleAnswer}
                    handleNextQuestion={handleNextQuestion}
                  />
                </React.Fragment>
              )}
            </div>
          ) : start ? (
            <h1 className="text-white">Loading...</h1>
          ) : (
            <h1></h1>
          )}
        </div>
      )}
    </div>
  );
}
export default App;
