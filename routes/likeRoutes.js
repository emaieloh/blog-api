import express from "express";
import { likeBlog } from "../controllers/likeControllers.js";

const router = express.Router();

router.post("/like-blog/:userId/:blogId", likeBlog);

export default router;
