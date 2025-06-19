import express from "express";
import userRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
