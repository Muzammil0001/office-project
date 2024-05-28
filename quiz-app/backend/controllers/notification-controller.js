const Notification = require("../models/notification-model");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      content: req.body.content,
      createdBy: req.body.createdBy,
    });
    await notification.save();
    res
      .status(201)
      .send({ message: "Notification created successfully", notification });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to create notification", error: error.message });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("createdBy");
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve notifications",
      error: error.message,
    });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      "createdBy"
    );
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve notification",
      error: error.message,
    });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    res.status(200).send({ message: "Notification deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete notification", error: error.message });
  }
};
