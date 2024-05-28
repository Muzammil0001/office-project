const AssignedCourse = require("../models/assigned-courses-model");

// Create a new assigned course===============
exports.createAssignedCourse = async (req, res) => {
  try {
    const { courseId, teacherId } = req.body;
    const newAssignedCourse = new AssignedCourse({
      courseId,
      teacherId,
    });
    await newAssignedCourse.save();
    res.status(201).send({
      message: "Assigned course created successfully",
      assignedCourse: newAssignedCourse,
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create assigned course",
      error: error.message,
    });
  }
};

// Get all assigned courses==================
exports.getAllAssignedCourses = async (req, res) => {
  try {
    const assignedCourses = await AssignedCourse.find()
      .populate("courseId")
      .populate("teacherId");
    res.status(200).send(assignedCourses);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve assigned courses",
      error: error.message,
    });
  }
};

// Get an assigned course by ID==================
exports.getAssignedCourseById = async (req, res) => {
  try {
    const assignedCourse = await AssignedCourse.findById(req.params.id)
      .populate("courseId")
      .populate("teacherId");
    if (!assignedCourse) {
      return res.status(404).send({ message: "Assigned course not found" });
    }
    res.status(200).send(assignedCourse);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve assigned course",
      error: error.message,
    });
  }
};

// Update an assigned course==================
exports.updateAssignedCourse = async (req, res) => {
  try {
    const updatedAssignedCourse = await AssignedCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAssignedCourse) {
      return res.status(404).send({ message: "Assigned course not found" });
    }
    res.status(200).send({
      message: "Assigned course updated successfully",
      assignedCourse: updatedAssignedCourse,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update assigned course",
      error: error.message,
    });
  }
};

// Delete an assigned course==================
exports.deleteAssignedCourse = async (req, res) => {
  try {
    const deletedAssignedCourse = await AssignedCourse.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAssignedCourse) {
      return res.status(404).send({ message: "Assigned course not found" });
    }
    res.status(200).send({
      message: "Assigned course deleted successfully",
      assignedCourse: deletedAssignedCourse,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete assigned course",
      error: error.message,
    });
  }
};
