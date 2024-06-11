const Course = require("../models/course-model");

////////////////// Create course
exports.createCourse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Course image is required" });
    }

    const course = new Course({
      courseName: req.body.courseName,
      description: req.body.description,
      courseImage: req.file.path,
    });

    const newCourse = await course.save();
    res.status(201).send(newCourse);
  } catch (err) {
    console.error("Error creating course:", err);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
};

////////////////// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

////////////////// Get a single course by id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.status(200).send(course);
    } else {
      res.status(404).send({ message: "Course not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

////////////////// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const updateData = {
      courseName: req.body.courseName,
      description: req.body.description,
    };

    if (req.file) {
      updateData.courseImage = req.file.path;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).send(updatedCourse);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

////////////////// Get a single course by Roles<=====================>
exports.getCourseCount = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.status(200).send({ courseCount: count });
  } catch (error) {
    console.error("Error getting users by role:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.toString() });
  }
};

////////////////// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted Successfully", course });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
