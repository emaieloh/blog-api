// Required modules
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";

// App variables

const app = express();
const PORT = process.env.PORT || 8080;

// App configuration

dotenv.config();
dbConnection();
app.use(express.json());

// Server activation
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
