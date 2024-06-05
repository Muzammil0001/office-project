const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

// Create a new users<=====================>
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.authTokenGenerator();
    await user.save();

    res.status(201).send(user); 
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const fetchedUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, fetchedUser.password);

    const token = await user.authTokenGenerator();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 1000 * 60 * 10),
    });
    console.log("cookie:", cookie);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users<=====================>
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("courseId", "courseName");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single user by IDs<=====================>
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single user by Roles<=====================>

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).send({ message: "Role parameter is required." });
    }

    const users = await User.find({ role: role }).populate(
      "courseId",
      "courseName"
    );
    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with the specified role." });
    }
    res.status(200).send(users);
  } catch (error) {
    console.error("Error getting users by role:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.toString() });
  }
};

// Get a single user by Roles<=====================>

exports.countUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).send({ message: "Role parameter is required." });
    }

    const count = await User.countDocuments({ role: role });
    res.status(200).send({ [`${role}Count`]: count });
  } catch (error) {
    console.error("Error getting users by role:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.toString() });
  }
};

// Update a user by IDs<=====================>
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a user by IDs<=====================>
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send({ message: "User Successfully deleted", user });
  } catch (error) {
    res.status(500).send(error);
  }
};
