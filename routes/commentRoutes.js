import express from "express";
import {
  addComment,
  deleteComment,
} from "../controllers/commentControllers.js";

const router = express.Router();

router.post("/add-comment", addComment);
router.delete("/delete-comment/:commentId/:blogId", deleteComment);

export default router;
