import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import asyncHandler from "express-async-handler";
import { cloudinary } from "../config/cloudinary.js";

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .sort({ date: -1 })
    .populate("comments")
    .populate("user")
    .exec();
  res.send(blogs);
});

const addBlog = asyncHandler(async (req, res) => {
  const { path, filename } = req.file;
  const { user, text } = req.body;

  const blog = new Blog({
    user,
    text,
    image: { url: path, filename },
  });

  const newBlog = await blog.save();
  res.status(201);
  res.send(newBlog);
});

const deleteBlog = (req, res) => {
  try {
    const { blogId, imageFilename } = req.params;
    Comment.deleteMany({ blogId }, (err, doc) => {
      Like.deleteMany({ blogId }, (err, doc) => {
        Blog.deleteOne({ _id: blogId }, (err, doc) => {
          cloudinary.uploader.destroy(`blog_api/${imageFilename}`);
          res.send(doc);
        });
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { getBlogs, addBlog, deleteBlog };
