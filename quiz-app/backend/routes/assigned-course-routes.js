const express = require("express");
const router = express.Router();
const assignedCourseController = require("../controllers/assigned-course-controller");

router.get("/course", assignedCourseController.getAllAssignedCourses);
router.get("/course/:id", assignedCourseController.getAssignedCourseById);
router.post("/course", assignedCourseController.createAssignedCourse);
router.patch("/course/:id", assignedCourseController.updateAssignedCourse);
router.delete("/course/:id", assignedCourseController.deleteAssignedCourse);

module.exports = router;
