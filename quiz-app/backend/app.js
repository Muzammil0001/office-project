require("dotenv").config();
const express = require("express");
const dbConfig = require("./utils/database-connection.js");
const userRoutes = require("./routes/user-routes.js");
const quizRoutes = require("./routes/quiz-routes.js");
const resultRoutes = require("./routes/result-routes.js");
const discussionRoutes = require("./routes/discussion-routes.js");
const announcementRoutes = require("./routes/announcement-routes.js");
const courseRoutes = require("./routes/course-routes.js");
const assignedCourseRoutes = require("./routes/assigned-course-routes.js");
const notificationRoutes = require("./routes/notification-routes.js");
const enrolledcourseRoutes = require("./routes/enrolled-courses-routes.js");
const cors = require("cors"); //For Cross Origin Resource Sharing
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
