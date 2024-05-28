require("dotenv").config();
const express = require("express");
const dbConfig = require("./utils/database-connection.js");
const userRoutes = require("./routes/user-routes");
const quizRoutes = require("./routes/quiz-routes");
const resultRoutes = require("./routes/result-routes");
const discussionRoutes = require("./routes/discussion-routes");
const announcementRoutes = require("./routes/announcement-routes");
const courseRoutes = require("./routes/course-routes.js");
const assignedCourseRoutes = require("./routes/assigned-course-routes.js");
const notificationRoutes = require("./routes/notification-routes.js");
const enrolledcourseRoutes = require("./routes/enrolled-courses-routes.js");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// App Routes
app.use(userRoutes);
app.use(quizRoutes);
app.use(resultRoutes);
app.use(discussionRoutes);
app.use(announcementRoutes);
app.use(courseRoutes);
app.use(assignedCourseRoutes);
app.use(notificationRoutes);
app.use(enrolledcourseRoutes);

const startServer = async () => {
  await dbConfig();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
