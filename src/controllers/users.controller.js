import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import logger from "../logs/logger.js";

async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "password", "status"],
      order: [["id", "DESC"]],
      where: {
        status: "active",
      },
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  const body = req.body;
  body.username = req.body.username;
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    res.json(user);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export default {
  getUsers,
  createUser,
};
