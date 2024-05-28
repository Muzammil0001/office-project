const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course-controller");

router.get("/course", courseController.getAllCourses);
router.get("/course/:id", courseController.getCourseById);
router.post("/course", courseController.createCourse);
router.patch("/course/:id", courseController.updateCourse);
router.delete("/course/:id", courseController.deleteCourse);

module.exports = router;
