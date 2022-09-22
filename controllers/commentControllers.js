import Comment from "../models/commentModel.js";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

const addComment = asyncHandler(async (req, res) => {
  const { user, text, blogId } = req.body;

  const comment = new Comment({
    user,
    text,
    blogId,
  });

  const newComment = await comment.save();

  const blog = await Blog.findOne({ _id: blogId });
  blog.comments.push(newComment._id);
  await blog.save();

  res.status(201);
  res.send(newComment);
});

export { addComment };
