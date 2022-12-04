"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const mongoose_1 = require("mongoose");
const post_js_1 = __importDefault(require("../models/post.js"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // wait 2 seconds to simulate a slow connection
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const { page } = req.params;
    const ITEMS_PER_PAGE = 5;
    try {
        const totalItems = yield post_js_1.default.find().countDocuments();
        const posts = yield post_js_1.default.find()
            .sort({ createdAt: -1 })
            .skip((+page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.status(200).json({ posts, totalItems });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_js_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category, tags, coverImage } = req.body;
    const newPost = new post_js_1.default({
        title,
        content,
        category,
        tags,
        coverImage,
    });
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(409).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, category, tags, coverImage } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { title, content, category, tags, coverImage, _id: id };
    yield post_js_1.default.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    yield post_js_1.default.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
});
exports.deletePost = deletePost;
