import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String },
      filename: { type: String },
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

export default Blog;
