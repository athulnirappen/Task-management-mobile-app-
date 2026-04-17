import "./config/env";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { userRoutes } from "./composition/user.module";
import { authRoutes } from "./composition/auth.module";
import { taskRoutes } from "./composition/task.module";
import { errorMiddleware } from "./interfaces/middlewares/error.middleware";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);
