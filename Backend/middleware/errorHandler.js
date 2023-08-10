const Messages = require("../utils/messages");

// General error handling middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.name);
  switch (error.name) {
    case "YupValidationError":
      return res.status(400).json({ message: error.message });
    default:
      return res.status(400).json({ message: Messages.serverError });
  }
};

module.exports = errorHandler;
