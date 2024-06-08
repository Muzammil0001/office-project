import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Home from "./pages";

import AdminMain from "./pages/user/admin/";
import QuizForm from "./components/quiz-form";
import Dashboard from "./pages/user/admin/dashboard";
import QuizzesList from "./pages/user/admin/quizzes";
import Profile from "./pages/user/admin/setting";
import Notify from "./pages/user/admin/notification";
import Chat from "./pages/user/admin/announcement";
import TeachersList from "./pages/user/admin/teachers";
import CoursesList from "./pages/user/admin/courses";
import ClassesList from "./pages/user/admin/classes";
import StudentsList from "./pages/user/admin/students";

import TeacherDashboard from "./pages/user/teacher";

import StudentMain from "./pages/user/student/";
import StudentDashboard from "./pages/user/student/dashboard";
import Quizzes from "./pages/user/student/quizzes";
import StudyMaterial from "./pages/user/student/study-material";
import LeaderBoard from "./pages/user/student/leaderboard";
import Courses from "./pages/user/student/courses";
import StudentProfileSetting from "./pages/user/student/setting";
import StudentNotify from "./pages/user/student/notification";
import StudentChat from "./pages/user/student/chat";

const App = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/create-quiz"
            element={
              role === "teacher" || (role === "admin" && isAuthenticated) ? (
                <QuizForm />
              ) : (
                <h1 className="text-center text-xl text-red-600 mt-5">
                  401 Unauthorized Access.
                </h1>
              )
            }
          />

          <Route
            path="students"
            element={
              role === "student" && isAuthenticated ? (
                <StudentMain />
              ) : (
                <Navigate to="/signin" />
              )
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="study-material" element={<StudyMaterial />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="profile" element={<StudentProfileSetting />} />
            <Route path="courses" element={<Courses />} />
            <Route path="notifications" element={<StudentNotify />} />
            <Route path="chat" element={<StudentChat />} />
          </Route>

          <Route
            path="teacher/dashboard"
            element={
              role === "teacher" && isAuthenticated ? (
                <TeacherDashboard />
              ) : (
                <Navigate to="/signin" />
              )
            }
          ></Route>

          <Route
            path="/admin"
            element={
              role === "admin" && isAuthenticated ? (
                <AdminMain />
              ) : (
                <Navigate to="/signin" />
              )
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quizzes" element={<QuizzesList />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notify />} />
            <Route path="announcements" element={<Chat />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="courses" element={<CoursesList />} />
            <Route path="classes" element={<ClassesList />} />
            <Route path="students" element={<StudentsList />} />
          </Route>

          <Route
            path="*"
            element={
              <h1 className="text-center text-xl text-red-600 mt-5">
                404 Page Not Found.
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
