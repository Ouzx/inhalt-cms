/**
 * @description Post routes
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module routes/post
 *
 * @requires express
 * @requires controllers/post
 */
import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost, searchPosts, } from "../controllers/post.js";
// Create router
const router = Router();
// Get all posts
router.get("/page/:id", getPosts);
// Get post by id
router.get("/:id", getPost);
// Create post
router.post("/", createPost);
// Update post
router.patch("/:id", updatePost);
// Delete Post
router.delete("/:id", deletePost);
// Search post
router.get("/search/:searchTerm/:pageIndex", searchPosts);
// Export router
export default router;
//# sourceMappingURL=post.js.map