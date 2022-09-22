// Required modules
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// App variables

const app = express();
const PORT = process.env.PORT || 8080;

// App configuration

dbConnection();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

// Server activation
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
