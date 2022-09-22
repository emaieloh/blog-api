import express from "express";
import { addComment } from "../controllers/commentControllers.js";

const router = express.Router();

router.post("/add-comment", addComment);

export default router;
