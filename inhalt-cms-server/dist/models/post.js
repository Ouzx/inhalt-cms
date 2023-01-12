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
import mongoose, { Schema, model } from "mongoose";
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
const postSchema = new Schema({
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
//# sourceMappingURL=post.js.map