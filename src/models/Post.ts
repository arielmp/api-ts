import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  Image: String,
  CreateAt: { type: Date, default: Date.now() },
  UpdatedAt: Date
});

export default model("Post", PostSchema);
