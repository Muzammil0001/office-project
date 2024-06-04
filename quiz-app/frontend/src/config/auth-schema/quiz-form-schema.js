import * as yup from "yup";

const quizSchema = yup.object({
  courseId: yup.string().required("Course selection is required*"),
  studentId: yup
    .array()
    .min(1, "At least one student must be selected")
    .required("This field is required*"),
  totalMarks: yup
    .number()
    .typeError("Total marks must be a number")
    .positive("Total marks must be greater than zero")
    .integer("Total marks must be an integer")
    .required("Total marks are required"),
  dueDate: yup.string().required("Date selection is required*"),
  quizTitle: yup.string().required("Quiz title is required*"),
  isActive: yup.boolean().required("Required*"),
  timeLimit: yup
    .number()
    .typeError("Time limit must be a number")
    .positive("Time limit must be greater than zero")
    .integer("Time limit must be an integer")
    .required("Quiz time limit is required"),
});

export default quizSchema;
