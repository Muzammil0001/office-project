const Course = require("../models/course-model");

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get a single course by id
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

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      courseName: req.body.courseName,
      batch: req.body.batch,
      image: req.body.image,
    });

    const newCourse = await course.save();
    res.status(201).send(newCourse);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedCourse);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted Successfully", course });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
