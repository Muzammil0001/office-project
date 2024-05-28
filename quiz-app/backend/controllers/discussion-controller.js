const Discussion = require("../models/discussion-model");

// Create Discussion
exports.createDiscussion = async (req, res) => {
  const { message, senderId, receiverId } = req.body;

  try {
    // Ensure both sender and receiver exist
    const senderExists = await User.findById(senderId);
    const receiverExists = await User.findById(receiverId);

    if (!senderExists || !receiverExists) {
      return res.status(404).send({ message: "Sender or receiver not found" });
    }

    const newDiscussion = new Discussion({
      message,
      senderId,
      receiverId,
    });

    await newDiscussion.save();
    res.status(201).send({
      message: "Discussion created successfully",
      discussion: newDiscussion,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to create discussion", error: error.message });
  }
};

// Get all Discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate("senderId")
      .populate("receiverId");
    res.status(200).send(discussions);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve discussions",
      error: error.message,
    });
  }
};

// Get a Discussion by ID
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate("senderId")
      .populate("receiverId");
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    res.status(200).send(discussion);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to retrieve discussion", error: error.message });
  }
};

// Update Discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true }
    )
      .populate("senderId")
      .populate("receiverId");
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    res
      .status(200)
      .send({ message: "Discussion updated successfully", discussion });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update discussion", error: error.message });
  }
};

// Delete Discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) {
      return res.status(404).send({ message: "Discussion not found" });
    }
    res.status(200).send({ message: "Discussion deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to delete discussion", error: error.message });
  }
};
