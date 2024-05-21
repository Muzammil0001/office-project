const mongoose = require('mongoose');

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connection successful...");
  } catch (err) {
    console.log("Database Connection Error:", err);
  }
};

module.exports = dbConfig;
