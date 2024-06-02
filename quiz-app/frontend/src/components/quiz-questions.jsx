import React from "react";
import { MdClose } from "react-icons/md";

const QuizQuestion = ({
  index,
  question,
  addOption,
  handleQuestionChange,
  removeQuestion,
  handleOptionChange,
  removeOption,
  handleAnswerChange,
  quizType,
}) => {
  return (
    <>
      <div
        key={index}
        className="p-5 shadow-lg rounded-md bg-white border relative"
      >
        <MdClose
          className="absolute top-2 right-2 cursor-pointer text-red-500"
          onClick={() => removeQuestion(question.id)}
          size={24}
        />
        <label className="block text-sm font-bold mb-2">
          Question {index + 1}
        </label>
        <input
          type="text"
          placeholder="Type question"
          value={question.questionText}
          onChange={(e) => handleQuestionChange(e.target.value, question.id)}
          className="input w-full mb-3 h-10 p-2 border rounded"
          required
        />
        {quizType === "multipleChoice" &&
          question.options.map((option, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="radio"
                name={`answer-${question.id}`}
                checked={option.isSelected}
                onChange={() =>
                  handleAnswerChange(option.optionText, question.id)
                }
                className="mr-2"
              />
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={option.optionText}
                onChange={(e) =>
                  handleOptionChange(e.target.value, question.id, option.id)
                }
                className=" w-full mb-3 h-8 px-2 border-b"
                required
              />
              <MdClose
                className="cursor-pointer text-red-500"
                onClick={() => removeOption(question.id, option.id)}
                size={24}
              />
            </div>
          ))}
        {quizType === "multipleChoice" && (
          <input
            type="text"
            disabled
            value={question.answer || ""}
            placeholder="Answer"
            className="input w-full mb-3 h-10 p-2 border rounded text-black"
          />
        )}
        {quizType === "multipleChoice" &&
          question.options.some((option) => option.optionText) &&
          !question.answer && (
            <p className="mx-2 text-red-500 text-[12px] mt-[-10px]">
              Select an answer*
            </p>
          )}
        {quizType === "multipleChoice" && question.options.length < 4 && (
          <button
            type="button"
            onClick={() => addOption(question.id)}
            className="py-2 px-4 mt-2 bg-gradient-to-tr from-blue-950 to-blue-500 text-white border-none"
          >
            Add Option
          </button>
        )}
      </div>
    </>
  );
};

export default QuizQuestion;
