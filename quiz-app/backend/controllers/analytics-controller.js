const Analytics = require('../models/analytics-model');

//Create Analytics<=====================>
exports.createAnalytics = async (req, res) => {
    try {
        const newAnalytics = new Analytics(req.body);
        await newAnalytics.save();
        res.status(201).send({ message: 'Analytics data created successfully', analytics: newAnalytics });
    } catch (error) {
        res.status(400).send({ message: 'Failed to create analytics data', error: error.message });
    }
};
//Get all Analytics<=====================>
exports.getAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find();
        res.status(200).send(analytics);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve analytics data', error: error.message });
    }
};
//Update Analytics<=====================>
exports.updateAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!analytics) {
            return res.status(404).send({ message: 'Analytics data not found' });
        }
        res.status(200).send({ message: 'Analytics data updated successfully', analytics });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update analytics data', error: error.message });
    }
};
//Delete Analytics<=====================>
exports.deleteAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.findByIdAndDelete(req.params.id);
        if (!analytics) {
            return res.status(404).send({ message: 'Analytics data not found' });
        }
        res.status(200).send({ message: 'Analytics data deleted successfully' ,analytics});
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete analytics data', error: error.message });
    }
};
