import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import taskRoutes from "./routes/tasks.router.js";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import { authenticateToken } from "./middlewares/authenticate.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/login", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", authenticateToken, taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
