import app from "./app.js";
import logger from "./logs/logger.js";
import "dotenv/config";

async function main() {
  app.listen(process.env.PORT);
  logger.info("server started on port: " + process.env.PORT);
  logger.error("server started on port: 3000");
  logger.warn("server started on port: 3000");
  logger.debug("server started on port: 3000");
  logger.fatal("server started on port: 3000");
  logger.trace("server started on port: 3000");
}

main();
