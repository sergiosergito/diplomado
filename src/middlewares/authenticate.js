import jwt from "jsonwebtoken";
import config from "../config/env.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log("Token faltante");
    return res.sendStatus(401);
  }
  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token inválido:", err.message);
      return res.sendStatus(403);
    }
    console.log("Token válido. Payload:", user);
    req.user = user;
    next();
  });
}
