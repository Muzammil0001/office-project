const Result = require('../models/result-model');

// CREATE a new results<=====================>
exports.createResult = async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.status(201).send({ message: 'Result recorded successfully', result: newResult });
    } catch (error) {
        res.status(500).send({ message: 'Failed to record result', error: error.message });
    }
};

// UPDATE a results<=====================>
exports.updateResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            return res.status(404).send({ message: 'Result not found' });
        }
        res.status(200).send({ message: 'Result updated successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update result', error: error.message });
    }
};

// DELETE a results<=====================>
exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send({ message: 'Result not found' });
        }
        res.status(200).send({ message: 'Result deleted successfully', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete result', error: error.message });
    }
};

// GET all results<=====================>
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find({});
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve results', error: error.message });
    }
};
