const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics-controller');

router.post('/analytics', analyticsController.createAnalytics);
router.get('/analytics', analyticsController.getAnalytics);
router.patch('/analytics/:id', analyticsController.updateAnalytics);
router.delete('/analytics/:id', analyticsController.deleteAnalytics);

module.exports = router;
