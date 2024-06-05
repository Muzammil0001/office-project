const Announcement = require("../models/announcement-model");

//Create Announcement<=====================>
exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).send({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to create announcement", error: error.message });
  }
};
//Get all Announcements<=====================>
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).send(announcements);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve announcements",
      error: error.message,
    });
  }
};

//Delete Announcement<=====================>
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).send({ message: "Announcement not found" });
    }
    res
      .status(200)
      .send({ message: "Announcement deleted successfully", announcement });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete announcement", error: error.message });
  }
};
