import { User } from "../models/user.js";
import { Status } from "../constants/index.js";
import { encriptar } from "../common/bcrypt.js";

async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "password", "status"],
      order: [["id", "DESC"]],
      where: {
        status: Status.ACTIVE,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  console.log("Entro al controlador");
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const userIdFromToken = req.user.userId;
    const requestedId = parseInt(req.params.id);
    console.log("ID en token (req.user.userId):", req.user?.userId);
    console.log("ID solicitado (req.params.id):", req.params.id);

    // Solo permitir acceso si el ID del token coincide con el solicitado
    if (userIdFromToken !== requestedId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByPk(requestedId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
  /*
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ["username", "password", "status"],
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
    */
}

async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    if (!username && !password) {
      return res
        .status(400)
        .json({ message: "Username or password is required" });
    }

    const passwordEncriptado = await encriptar(password);

    const user = await User.update(
      {
        username,
        password: passwordEncriptado,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

async function activateInactivate(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!status) res.status(400).json({ message: "Status is required" });
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (user.status === status) {
      res.status(409).json({ message: "Same status" });
    }
    user.status = status;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  activateInactivate,
};
