require("dotenv").config();
const mongoose = require("mongoose");

const DBconn = async () => {
  return mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = DBconn;
