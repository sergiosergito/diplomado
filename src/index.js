import "dotenv/config";
import app from "./app.js";
import logger from "./logs/logger.js";
import config from "./config/env.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({ force: true });
  console.log("=====> " + config.PORT);
  app.listen(process.env.PORT);
  logger.info("server started on port: " + process.env.PORT);
  logger.error("server started on port: 3000");
  logger.warn("server started on port: 3000");
  logger.debug("server started on port: 3000");
  logger.fatal("server started on port: 3000");
}

main();
