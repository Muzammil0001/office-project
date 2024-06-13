import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import Home from "./pages";
import QuizPage from "./pages/user/student/quiz";
import UserChat from "./pages/user/user-components/chat";
import QuizForm from "./pages/user/user-components/quiz-form";
import UserNotifications from "./pages/user/user-components/notification";
import AdminMain from "./pages/user/admin";
import AdminDashboard from "./pages/user/admin/dashboard";
import ProfileSetting from "./pages/user/user-components/setting";
import Chat from "./pages/user/user-components/chat";
import TeachersList from "./pages/user/admin/teachers";
import CoursesList from "./pages/user/admin/courses";
import ClassesList from "./pages/user/admin/classes";
import StudentsList from "./pages/user/admin/students";
import StudentMain from "./pages/user/student";
import StudentDashboard from "./pages/user/student/dashboard";
import StudentStudyMaterial from "./pages/user/student/study-material";
import StudentLeaderBoard from "./pages/user/student/leaderboard";
import StudentCourses from "./pages/user/student/courses";
import StudentQuizzes from "./pages/user/student/quizzes";
import TeacherMain from "./pages/user/teacher";
import TeacherDashboard from "./pages/user/teacher/dashboard";
import TeacherCourses from "./pages/user/teacher/courses";
import ControlQuizzes from "./pages/user/user-components/quizzes";
import TeacherLeaderBoard from "./pages/user/teacher/student-perfromance";
import TeacherStudyMaterial from "./pages/user/teacher/study-material";
import ProtectedRoute from "./config/routes-config/protected-routes";
import AdminAnnouncement from "./pages/user/admin/announcement";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute allowedRoles={["teacher", "admin"]} />}>
          <Route path="/create-quiz" element={<QuizForm />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/students" element={<StudentMain />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="quizzes" element={<StudentQuizzes />} />
            <Route path="study-material" element={<StudentStudyMaterial />} />
            <Route path="leaderboard" element={<StudentLeaderBoard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="profile" element={<ProfileSetting />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="chat" element={<UserChat />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/teacher" element={<TeacherMain />}>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="chat" element={<UserChat />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="quizzes" element={<ControlQuizzes />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="profile" element={<ProfileSetting />} />
            <Route path="performance" element={<TeacherLeaderBoard />} />
            <Route path="study-material" element={<TeacherStudyMaterial />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminMain />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="quizzes" element={<ControlQuizzes />} />
            <Route path="profile" element={<ProfileSetting />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="announcements" element={<AdminAnnouncement />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="courses" element={<CoursesList />} />
            <Route path="classes" element={<ClassesList />} />
            <Route path="students" element={<StudentsList />} />
          </Route>
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
  );
};

export default App;
