import logger from "../logs/logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error(err.message);

  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: err.message });
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeForeignkeyConstraintError"
  ) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
}
