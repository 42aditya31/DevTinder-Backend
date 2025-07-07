const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectDatabase;


