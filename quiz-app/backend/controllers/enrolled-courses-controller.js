const EnrolledCourse = require("../models/enrolled-courses-js");

// Create an enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const newEnrollment = new EnrolledCourse(req.body);
    await newEnrollment.save();
    res.status(201).send({
      message: "Enrollment created successfully",
      enrollment: newEnrollment,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to create enrollment", error: error.message });
  }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await EnrolledCourse.find()
      .populate("studentId")
      .populate("courseId");
    res.status(200).send(enrollments);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve enrollments",
      error: error.message,
    });
  }
};

// Get all students enrolled in special course
exports.getStudentsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res
        .status(400)
        .send({ message: "CourseId parameter is required." });
    }
    const enrollments = await EnrolledCourse.find({
      courseId: courseId,
    }).populate({
      path: "studentId",
      select: "username _id",
    });

    if (enrollments.length === 0) {
      return res.status(404).send({
        message: "No students found enrolled in the specified course.",
      });
    }

    const students = enrollments.map((enrollment) => enrollment.studentId);

    res.status(200).send(students);
  } catch (error) {
    console.error("Error retrieving students by courseId:", error);
    res.status(500).send({
      message: "Failed to retrieve students",
      error: error.message,
    });
  }
};

// Get a specific enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await EnrolledCourse.findById(req.params.id)
      .populate("studentId")
      .populate("courseId");
    if (!enrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.status(200).send(enrollment);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to retrieve enrollment", error: error.message });
  }
};

// Update an enrollment
exports.updateEnrollment = async (req, res) => {
  try {
    const updatedEnrollment = await EnrolledCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEnrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.status(200).send({
      message: "Enrollment updated successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update enrollment", error: error.message });
  }
};

// Delete an enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await EnrolledCourse.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEnrollment) {
      return res.status(404).send({ message: "Enrollment not found" });
    }
    res.status(200).send({
      message: "Enrollment deleted successfully",
      enrollment: deletedEnrollment,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete enrollment", error: error.message });
  }
};
