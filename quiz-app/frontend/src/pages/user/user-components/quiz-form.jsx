import React, { useEffect, useState } from "react";
import { getCoursesApi } from "../../../apis/course-apis";
import QuizQuestion from "./quiz-questions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelectInput from "./multiselect";
import quizSchema from "../../../config/auth-schema/quiz-form-schema";
import { getStudentsByCourse } from "../../../apis/enrolled-courses";
import { postQuiz } from "../../../apis//quizzes-apis";
import { useNavigate } from "react-router-dom";

const QuizForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const teacherCourseIds = user?.courseId;
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizType, setQuizType] = useState("multipleChoice");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "",
      options: [
        { id: 1, optionText: "", isSelected: false },
        { id: 2, optionText: "", isSelected: false },
      ],
      answer: "",
    },
  ]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(quizSchema),
  });

  const handleSelectedStudents = async (selectedStd) => {
    setSelectedStudents(selectedStd);
  };

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);

    console.log("setSelectedCourse:", courseId);
    if (courseId) {
      try {
        const enrolledStudents = await getStudentsByCourse(courseId);
        console.log("enrolledStudents:", enrolledStudents);
        setStudents(enrolledStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    } else {
      setStudents([]);
    }
  };

  const addQuestion = () => {
    const lastQuestion = questions[questions.length - 1];
    let newQuestion = {};
    if (quizType === "multipleChoice") {
      if (!lastQuestion.questionText || lastQuestion.options.length < 2) {
        alert("Please complete the last question before adding a new one.");
        return;
      }
      newQuestion = {
        id: questions.length + 1,
        questionText: "",
        options: [
          { id: 1, optionText: "" },
          { id: 2, optionText: "" },
        ],
      };
    }

    if (quizType === "text") {
      if (!lastQuestion.questionText) {
        alert("Please complete the last question before adding a new one.");
        return;
      }
      newQuestion = {
        id: questions.length + 1,
        questionText: "",
      };
    }

    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (text, questionId) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId
        ? { ...question, questionText: text }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (text, questionId, optionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedOptions = question.options.map((option) =>
          option.id === optionId ? { ...option, optionText: text } : option
        );
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (optionText, questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedOptions = question.options.map((option) => ({
          ...option,
          isSelected: option.optionText === optionText,
        }));
        return { ...question, options: updatedOptions, answer: optionText };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addOption = (questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId && question.options.length < 4) {
        const newOption = { id: question.options.length + 1, optionText: "" };
        return { ...question, options: [...question.options, newOption] };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionId, optionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (question.options.length > 2) {
          const filteredOptions = question.options.filter(
            (option) => option.id !== optionId
          );
          return { ...question, options: filteredOptions };
        } else {
          alert("Each question must have at least two options.");
        }
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questionId) => {
    if (questions.length == 1) {
      setQuestions(questions);
    } else {
      setQuestions(questions.filter((question) => question.id !== questionId));
    }
  };
  const onSubmit = async (data) => {
    try {
      delete data.studentId;
      data.studentId = selectedStudents?.map((student) => student);
      if (quizType === "multipleChoice") {
        if (questions.some((question) => question.answer === "")) {
          alert("Answers must be selected for each question");
        }
      }
      data.questions = questions;
      data.createdBy = JSON.parse(localStorage.getItem("user"))._id;
      console.log("Quiz Form Data:", data);
      if (questions.length === 0 || !selectedCourse) {
        alert(
          "Please ensure you have selected a course and added at least one question."
        );
      }
      await postQuiz(data);
      reset();
      navigate(-1);
    } catch (error) {
      console.error("Failed to create Quiz:", error);
    }
  };

  const getCourseFunc = async () => {
    const response = await getCoursesApi();

    console.log("courses all", response);
    if (role === "teacher") {
      const teacherCourses = response.filter((course) =>
        teacherCourseIds.includes(course._id)
      );
      setCourses(teacherCourses);
      console.log("courses teacher", teacherCourses);
    } else if (role === "admin") {
      setCourses(response);
      console.log("courses all", response);
    }
  };
  useEffect(() => {
    getCourseFunc();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-2xl  my-5 ">Create a new quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div>
            <select
              {...register("courseId")}
              className={`input w-full h-10 p-2 shadow-md rounded ${
                errors.courseId ? "border border-red-600" : ""
              }`}
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value=""> --Select Course-- </option>
              {courses?.map((course, idx) => (
                <option key={idx} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
            <p className="mx-2 text-red-500 text-[12px] pt-1">
              {errors.courseId?.message}
            </p>
          </div>

          <MultiSelectInput
            students={students}
            control={control}
            name="studentId"
            errors={errors}
            selectedStudents={(selectedStd) => {
              handleSelectedStudents(selectedStd);
            }}
          />

          <div>
            <input
              min={0}
              type="number"
              placeholder="Time Limit (minutes)"
              {...register("timeLimit")}
              className={`input w-full h-10 p-2 shadow-md rounded ${
                errors.timeLimit ? "border border-red-600" : ""
              }`}
            />
            <p className="mx-2 text-red-500 text-[12px] pt-1">
              {errors.timeLimit?.message}
            </p>
          </div>

          <div>
            <input
              type="number"
              min={0}
              placeholder="Total Marks"
              {...register("totalMarks")}
              className={`input w-full h-10 p-2 shadow-md rounded ${
                errors.totalMarks ? "border border-red-600" : ""
              }`}
            />
            <p className="mx-2 text-red-500 text-[12px] pt-1">
              {errors.totalMarks?.message}
            </p>
          </div>

          <div>
            <input
              type="date"
              placeholder="Due Date"
              {...register("dueDate")}
              className={`input w-full h-10 p-2 shadow-md rounded ${
                errors.dueDate ? "border border-red-600" : ""
              }`}
              min={new Date().toISOString().split("T")[0]}
            />
            <p className="mx-2 text-red-500 text-[12px] pt-1">
              {errors.dueDate?.message}
            </p>
          </div>

          <div>
            <select
              className="input w-full h-10 p-2 shadow-md rounded"
              {...register("isActive")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-12 sm:col-span-9 order-2 sm:order-1">
            <input
              type="text"
              placeholder="Quiz Title"
              {...register("quizTitle")}
              className={`input w-full h-10 p-2 shadow-md rounded ${
                errors.quizTitle ? "border border-red-600" : ""
              }`}
            />
            <p className="mx-2 text-red-500 text-[12px] pt-1">
              {errors.quizTitle?.message}
            </p>
          </div>

          <select
            name="questionType"
            className="input w-full col-span-12 order-1 sm:order-2 sm:col-span-3 h-10 p-2 shadow-md rounded"
            required
            onChange={(e) => {
              setQuizType(e.target.value);
            }}
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="text">Text</option>
          </select>
        </div>

        {questions.map((question, index) => (
          <QuizQuestion
            key={index}
            quizType={quizType}
            index={index}
            question={question}
            handleQuestionChange={(text, questionId) =>
              handleQuestionChange(text, questionId)
            }
            removeQuestion={(questionId) => removeQuestion(questionId)}
            addOption={(questionId) => addOption(questionId)}
            removeOption={(questionId, optionId) =>
              removeOption(questionId, optionId)
            }
            handleAnswerChange={(optionText, questionId) =>
              handleAnswerChange(optionText, questionId)
            }
            handleOptionChange={(text, questionId, optionId) =>
              handleOptionChange(text, questionId, optionId)
            }
          />
        ))}
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center">
          <button
            type="button"
            onClick={addQuestion}
            className="w-full sm:w-[max-content] py-2 px-4 bg-gradient-to-tr from-blue-950 to-blue-500 text-white border-none"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="w-full sm:w-[max-content] shadow-md bg-green-600 hover:opacity-90 py-2 px-4"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
