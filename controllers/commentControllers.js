import Comment from "../models/commentModel.js";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

// Add a comment on a blog
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

// Delete a comment on a blog
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId, blogId } = req.params;
  const comment = await Comment.findById(commentId);

  if (comment) {
    Blog.findOneAndUpdate(
      { _id: blogId },
      { $pull: { comments: comment._id } },
      {
        new: true,
        useFindAndModify: false,
      },
      (err, doc) => {
        Comment.deleteOne({ _id: commentId }, (err, doc) => {
          res.send(doc);
        });
      }
    );
  } else {
    res.status(404);
    throw new Error("Comment not found.");
  }
});

export { addComment, deleteComment };
