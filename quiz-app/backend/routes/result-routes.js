const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result-controller");

////////////// Route to handle creating a new result
router.post("/results", resultController.createResult);

////////////// Route to update a specific result
router.patch("/results/:id", resultController.updateResult);

////////////// Route to delete a specific result
router.delete("/results/:id", resultController.deleteResult);

////////////// Route to get all results
router.get("/results", resultController.getAllResults);

module.exports = router;
