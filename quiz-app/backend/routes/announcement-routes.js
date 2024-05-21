const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');

router.post('/announcements', announcementController.createAnnouncement);
router.get('/announcements', announcementController.getAnnouncements);
router.patch('/announcements/:id', announcementController.updateAnnouncement);
router.delete('/announcements/:id', announcementController.deleteAnnouncement);

module.exports = router;
