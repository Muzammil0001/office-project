const express = require("express");
const router = express.Router();
const enrolledCourseController = require("../controllers/enrolled-courses-controller");

router.post("/enrollments/", enrolledCourseController.createEnrollment);
router.get("/enrollments/", enrolledCourseController.getAllEnrollments);
router.get(
  "/enrollments/students/",
  enrolledCourseController.getStudentsByCourseId
);
router.get('/courses/enrollments/:studentId', enrolledCourseController.getCoursesByStudentId);
router.get("/enrollments/:id", enrolledCourseController.getEnrollmentById);
router.patch("/enrollments/:id", enrolledCourseController.updateEnrollment);
router.delete("/enrollments/:id", enrolledCourseController.deleteEnrollment);

module.exports = router;
