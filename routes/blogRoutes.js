import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  getBlogs,
  getUserBlogs,
  addBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";

const router = express.Router();
const blogImage = multer({ storage });

router.get("/", getBlogs);
router.get("/user-blogs/:username", getUserBlogs);
router.post("/add-blog", blogImage.single("image"), addBlog);
router.delete("/delete-blog/:blogId/:imageFilename", deleteBlog);

export default router;
