/**
 * @description Post controller
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module controllers/post
 *
 * @requires mongoose : Types for checking id validity
 * @requires express : Request, Response for typescript type checking
 * @requires models/post : Post model and Post Interface
 *
 * @exports getPosts : Get all posts
 * @exports getPost : Get a single post
 * @exports createPost : Create a new post
 * @exports updatePost : Update a post
 * @exports deletePost : Delete a post
 * @exports searchPosts : Search posts
 */

import { Types } from "mongoose";
import { Request, Response } from "express";
import Post, { iPost } from "../models/post.js";

/**
 * @description Get all posts
 * @route GET /posts/page/:id
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object params: id
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const getPosts = async (req: Request, res: Response) => {
  // wait 2 seconds to simulate a slow connection
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // Extract id from request params
  const { id } = req.params;

  try {
    // Check if id is not available
    // then throw an error
    if (!id) throw `No page with id: ${id}`;

    // Basic pagination logic
    // Convert id to number and add one
    const page: number = +id + 1;
    const ITEMS_PER_PAGE = 5;

    // Get total number of posts
    const totalItems = await Post.find().countDocuments();

    // if (!totalItems) throw new Error("No posts found");

    // Get posts from database according to pagination logic
    // Sort by createdAt in descending order
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((+page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    // Send response
    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Get a single post
 * @route GET /posts/:id
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object params: id
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const getPost = async (req: Request, res: Response) => {
  // Extract id from request params
  const { id } = req.params;

  try {
    // Check if id is not valid then throw an error
    if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

    // Get post from database
    // if there is no post it will return null
    // returning null handled by frontend
    const post = await Post.findById(id);

    // Send response
    res.status(200).json(post);
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Create a new post
 * @route POST /posts
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object body: @interface iPost
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const createPost = async (req: Request, res: Response) => {
  // Extract post data from request body
  const {
    title,
    content,
    category,
    tags,
    thumbnail,
    raw,
    shared,
    urlSuffix,
    shortContent,
    user,
  } = req.body;

  try {
    // Check if any field is empty then throw an error
    if (!title || !content || !category || !tags || !thumbnail)
      throw new Error("Please fill all fields");

    // Create a new post via iPost interface
    const newPost = new Post({
      title,
      content,
      category,
      tags,
      thumbnail,
      raw,
      shared,
      urlSuffix,
      shortContent,
      user,
    } as iPost);
    await newPost.save();

    // Send response
    res.status(201).json(newPost);
  } catch (e) {
    if (e instanceof Error) res.status(409).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Update a post
 * @route PATCH /posts/:id
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object params: @interface iPost
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const updatePost = async (req: Request, res: Response) => {
  // Extract id from request params
  const { id } = req.params;

  try {
    // Check if id is not valid then throw an error
    if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

    // Extract post data from request body
    const {
      title,
      content,
      category,
      tags,
      thumbnail,
      raw,
      shared,
      shortContent,
      user,
    } = req.body;

    // Check if any field is empty then throw an error
    if (!title || !content || !category || !tags || !thumbnail)
      throw new Error("Please fill all fields");

    // Create a post template via iPost interface
    const updatedPost = {
      title,
      content,
      category,
      tags,
      thumbnail,
      raw,
      shared,
      shortContent,
      user,
    } as iPost;

    // Update post in database
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    // Send response
    res.json(updatedPost);
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Delete a post
 * @route DELETE /posts/:id
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object params: id
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const deletePost = async (req: Request, res: Response) => {
  // Extract id from request params
  const { id } = req.params;

  try {
    // Check if id is not valid then throw an error
    if (!Types.ObjectId.isValid(id)) throw `No post with id: ${id}`;

    // Delete post from database
    await Post.findByIdAndRemove(id);

    // Send response
    res.json({ message: "Post deleted successfully." });
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * @description Search post on pagination
 * @route GET /posts/search/:searchTerm/:pageIndex
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object params: searchTerm, pageIndex
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const searchPosts = async (req: Request, res: Response) => {
  /**
   * Search order:
   * * first search for title
   * * then search for content
   * * then search for tags
   * * then search for category
   * * and then combine all results
   *
   */

  // Extract searchTerm and pageIndex from request params
  const { searchTerm, pageIndex } = req.params;

  // Apply pagination logic
  // Convert pageIndex to number
  const page: number = +pageIndex + 1;
  const ITEMS_PER_PAGE = 5;

  // Create a regular expressions for search
  const title = new RegExp(searchTerm, "i");
  const content = new RegExp(searchTerm, "i");
  const tags = new RegExp(searchTerm, "i");
  const category = new RegExp(searchTerm, "i");

  // TODO: If posts count lower than pagenumber * itemsperpage, return last available page
  try {
    // Get founded posts count using regular expressions
    const totalItems = await Post.find({
      $or: [{ title }, { content }, { tags }, { category }],
    }).countDocuments();

    // Get founded posts using regular expressions
    // don't sort for avoiding change revelance
    const posts = await Post.find({
      $or: [
        { title },
        { content },
        {
          tags,
        },
        {
          category,
        },
      ],
    })
      // .sort({ createdAt: -1 })
      .skip((+page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    // Check if posts is empty then throw an error
    if (!posts.length) throw new Error("No posts found");

    // Send response
    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
