import Like from "../models/likeModel.js";
import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";

const likeBlog = asyncHandler(async (req, res) => {
  const { userId, blogId } = req.params;

  const liked = await Like.findOne({ userId, blogId });

  if (!liked) {
    const like = new Like({
      userId,
      blogId,
    });

    const newLike = await like.save();

    const blog = await Blog.findOne({ _id: blogId });
    blog.likes.push(newLike._id);
    await blog.save();

    res.status(201);
    res.send(newLike);
  } else {
    Blog.findOneAndUpdate(
      { _id: blogId },
      { $pull: { likes: liked._id } },
      {
        new: true,
        useFindAndModify: false,
      },
      (err, doc) => {
        Like.deleteOne({ userId, blogId }, (err, doc) => {
          res.send(doc);
        });
      }
    );
  }
});

export { likeBlog };
