import * as yup from "yup";

const quizSchema = yup.object({
  courseId: yup.string().required("Course selection is required*"),
  studentId: yup.string().required("Student selection is required*"),
  totalMarks: yup
    .string()
    .matches(/^[0-9]+$/, "Must only contain numbers 0-9*")
    .required("Total marks required*"),
  dueDate: yup.string().required("Date selection is required*"),
  quizTitle: yup.string().required("Quiz title is required*"),
  timeLimit: yup
    .string()
    .matches(/^[0-9]+$/, "Must only contain numbers 0-9*")
    .required("Quiz time limit is required*"),
});

export default quizSchema;
