import { User } from "../models/user.js";
import { Task } from "../models/task.js";

function getUsers(req, res) {
  res.json({
    message: "Welcome to the users API from controller",
  });
}

export default {
  getUsers,
};
