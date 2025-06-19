import { Router } from "express";
import userController from "../controllers/users.controller.js";
import validate from "../validators/validate.js";
import { createUserSchema } from "../validators/user.validate.js";

const router = Router();

router
  .route("/")
  .get(userController.getUsers)
  .post(validate(createUserSchema, "body"), userController.createUser);

export default router;
