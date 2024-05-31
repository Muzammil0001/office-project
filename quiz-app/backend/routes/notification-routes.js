const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification-controller");

// Route to create a new notification
router.post("/notification", notificationController.createNotification);

// Route to get all notifications
router.get("/notification", notificationController.getNotifications);

// Route to get a single notification by ID
router.get("/notification/:id", notificationController.getNotificationById);

// Route to delete a notification
router.delete("/notification/:id", notificationController.deleteNotification);

module.exports = router;
