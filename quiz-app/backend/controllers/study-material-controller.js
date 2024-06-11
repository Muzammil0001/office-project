const StudyMaterial = require("../models/study-material-model");

exports.createStudyMaterial = async (req, res) => {
  try {
    const { courseId, title, description, content } = req.body;

    if (!req.file) {
      return res.status(400).send({ message: "study meterial is required" });
    }

    const newStudyMaterial = new StudyMaterial({
      courseId,
      title,
      description,
      content: req.file.path,
    });

    const savedStudyMaterial = await newStudyMaterial.save();

    res.status(201).send({
      message: "Study material created successfully",
      studyMaterial: savedStudyMaterial,
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create study material",
      error,
    });
  }
};

exports.getStudyMaterials = async (req, res) => {
  try {
    const studyMaterials = await StudyMaterial.find().populate(
      "courseId",
      "courseName"
    );
    res.status(200).send(studyMaterials);
  } catch (error) {
    res.status(400).send({
      message: "Failed to fetch study materials",
      error,
    });
  }
};

exports.getStudyMaterialById = async (req, res) => {
  try {
    const studyMaterial = await StudyMaterial.findById(req.params.id).populate(
      "courseId",
      "courseName"
    );
    if (!studyMaterial) {
      return res.status(404).send({
        message: "Study material not found",
      });
    }
    res.status(200).send(studyMaterial);
  } catch (error) {
    res.status(400).send({
      message: "Failed to fetch study material",
      error,
    });
  }
};

exports.updateStudyMaterial = async (req, res) => {
  try {
    const updatedStudyMaterial = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudyMaterial) {
      return res.status(404).send({
        message: "Study material not found",
      });
    }
    res.status(200).send({
      message: "Study material updated successfully",
      studyMaterial: updatedStudyMaterial,
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to update study material",
      error,
    });
  }
};

exports.deleteStudyMaterial = async (req, res) => {
  try {
    const deletedStudyMaterial = await StudyMaterial.findByIdAndDelete(
      req.params.id
    );
    if (!deletedStudyMaterial) {
      return res.status(404).send({
        message: "Study material not found",
      });
    }
    res.status(200).send({
      message: "Study material deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: "Failed to delete study material",
      error,
    });
  }
};
