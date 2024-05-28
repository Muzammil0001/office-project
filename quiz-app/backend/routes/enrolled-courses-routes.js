const express = require("express");
const router = express.Router();
const enrolledCourseController = require("../controllers/enrolled-courses-controller");
router.post("enrolledcourse/", enrolledCourseController.createEnrollment);
router.get("/enrolledcourse/", enrolledCourseController.getAllEnrollments);
router.get("/enrolledcourse/:id", enrolledCourseController.getEnrollmentById);
router.patch("/enrolledcourse/:id", enrolledCourseController.updateEnrollment);
router.delete("/enrolledcourse/:id", enrolledCourseController.deleteEnrollment);

module.exports = router;
