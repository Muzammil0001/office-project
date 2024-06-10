import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../apis/quizzes-apis";

const Quiz = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const resp = await getQuizById(id);
        setQuizData(resp);
        setTimeLeft(resp.timeLimit * 60);
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft !== null) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsTimeUp(true);
        handleSubmit();
        alert("Time Up");
      }
    }
  }, [timeLeft]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = () => {
    console.log("Quiz Submission:", selectedAnswers);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{quizData.quizTitle}</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="font-semibold">Time Left: </span>
          <span>{formatTime(timeLeft)}</span>
        </div>
        <div>
          <span className="font-semibold">Total Marks: </span>
          <span>{quizData.totalMarks}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-3 mt-5 sm:mt-10">{currentQuestion.questionText}</h3>
        {currentQuestion.options.map((option) => (
          <div key={option._id} className="mb-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name={currentQuestion._id}
                value={option.optionText}
                checked={
                  selectedAnswers[currentQuestion._id] === option.optionText
                }
                onChange={() =>
                  handleOptionChange(currentQuestion._id, option.optionText)
                }
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span>{option.optionText}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5 sm:mt-10">
        <button
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700  hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentQuestionIndex < quizData.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded ${
              isTimeUp
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 cursor-pointer"
            }`}
            disabled={isTimeUp}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
