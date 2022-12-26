import { Router } from "express";
import imager from "../middlewares/imager.js";
import { getPosts, getPost, createPost, updatePost, deletePost, searchPosts, } from "../controllers/post.js";
const router = Router();
router.get("/page/:id", getPosts);
router.get("/:id", getPost);
router.post("/", imager, createPost);
router.patch("/:id", imager, updatePost);
router.delete("/:id", deletePost);
router.get("/search/:searchTerm/:pageIndex", searchPosts);
export default router;
//# sourceMappingURL=post.js.map