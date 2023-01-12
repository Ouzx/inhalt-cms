/**
 * @description Auth routes
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module routes/auth
 *
 * @requires express
 * @requires controllers/auth
 * @requires middlewares/imager
 */
import { Router } from "express";
import { register, login, validate } from "../controllers/auth.js";
import { multerMiddlewareSingle } from "../middlewares/imager.js";

// Create router
const router = Router();

// Register disabled for preventing multiple users
// uncomment when its needed
// router.post("/register", multerMiddlewareSingle, register);

// Login
router.post("/login", login);

// Validate token
router.get("/validate-token", validate);

// export it to use as app.use()
export default router;
