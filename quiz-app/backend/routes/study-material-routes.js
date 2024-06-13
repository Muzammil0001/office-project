const express = require("express");
const router = express.Router();
const upload = require("../utils/file-upload-config");
const {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterialById,
  updateStudyMaterial,
  deleteStudyMaterial,
} = require("../controllers/study-material-controller");

router.post("/study-material", upload.single("content"), createStudyMaterial);

router.get("/study-material", getStudyMaterials);

router.get("/study-material/:id", getStudyMaterialById);

router.patch(
  "/study-material/:id",
  upload.single("content"),
  updateStudyMaterial
);

router.delete("/study-material/:id", deleteStudyMaterial);

module.exports = router;
