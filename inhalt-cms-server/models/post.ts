/**
 * @description Post model
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module models/post
 *
 * @requires mongoose : MongoDB ORM
 * @requires models/user : User model
 *
 * @exports iPost : Post interface
 * @exports default : Post model
 */
import mongoose, { Document, Schema, model } from "mongoose";
import User from "./user.js";

/**
 * @description Post interface
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @interface iPost
 *
 * @property {string} title - Post title
 * @property {string} content - Post content
 * @property {string} category - Post category
 * @property {string[]} tags - Post tags
 * @property {string} thumbnail - Post thumbnail
 * @property {string} raw - Post raw content
 * @property {boolean} shared - Post shared
 * @property {string} urlSuffix - Post url suffix
 * @property {string} shortContent - Post short content
 * @property {Date} createdAt - Post created at
 * @property {Date} updatedAt - Post updated at
 * @property {typeof User} user - Post user
 */
export interface iPost extends Document {
  title: string;
  content: string;
  category: string;
  tags?: string[] | null;
  thumbnail: string;
  raw: string;
  shared: boolean;
  urlSuffix: string;
  shortContent: string;
  createdAt: Date;
  updatedAt: Date;
  user: typeof User;
}

/**
 * @description Post schema
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @const
 * @type {Schema<iPost>}
 * @implements {iPost}
 */
const postSchema = new Schema<iPost>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  raw: {
    type: String,
    required: true,
  },
  shared: {
    type: Boolean,
    required: true,
  },
  urlSuffix: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

// Create post model
const Post = model("Post", postSchema);

export default Post;
