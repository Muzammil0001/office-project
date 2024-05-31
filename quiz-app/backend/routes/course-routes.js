const express = require("express");
const router = express.Router();
const upload = require("../utils/file-upload-config");
const courseController = require("../controllers/course-controller");

router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
router.get("/count/courses", courseController.getCourseCount);
router.post(
  "/courses",
  upload.single("courseImage"),
  courseController.createCourse
);
router.patch(
  "/courses/:id",
  upload.single("courseImage"),
  courseController.updateCourse
);
router.delete("/courses/:id", courseController.deleteCourse);

module.exports = router;
