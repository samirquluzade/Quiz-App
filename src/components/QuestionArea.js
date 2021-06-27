import React from "react";

const QuestionArea = ({
  showAnswers,
  handleAnswer,
  handleNextQuestion,
  data,
}) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white text-purple-800 p-10 rounded-lg shadow-md">
        <h2
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: data.question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {data.answers.map(answer => {
          const bgColor = showAnswers
            ? answer === data.correct_answer
              ? "bg-green-500"
              : "bg-red-500"
            : "bg-white";
          const textColor = showAnswers ? "text-white" : "text-purple-800";
          return (
            <button
              className={`${bgColor} ${textColor} p-4 font-semibold rounded shadow`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button
          onClick={handleNextQuestion}
          className={`mt-6 ml-auto bg-pink-700 text-white p-4 font-semibold rounded shadow`}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuestionArea;
