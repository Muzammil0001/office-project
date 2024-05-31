import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Home from "./pages";
import StudentDashbaord from "./pages/user/student";
import TeacherDashboard from "./pages/user/teacher";
import AdminDashboard from "./pages/user/admin";
import QuizForm from "./components/quiz-form";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizForm />} />
          <Route path="/student" element={<StudentDashbaord />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
