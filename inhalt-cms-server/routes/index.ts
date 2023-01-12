/**
 * @description This file exports all the routes in the routes folder
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module routes/index
 *
 * @requires routes/auth
 * @requires routes/image
 * @requires routes/post
 */
import auth from "./auth.js";
import image from "./image.js";
import post from "./post.js";

export { auth, image, post };
