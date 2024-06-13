const express = require("express");
const router = express.Router();
const assignedCourseController = require("../controllers/assigned-course-controller");

router.get("/assigned-course", assignedCourseController.getAllAssignedCourses);
router.get("/assigned-course/:id", assignedCourseController.getAssignedCourseById);
router.post("/assigned-course", assignedCourseController.createAssignedCourse);
router.patch("/assigned-course/:id", assignedCourseController.updateAssignedCourse);
router.delete("/assigned-course/:id", assignedCourseController.deleteAssignedCourse);

module.exports = router;
