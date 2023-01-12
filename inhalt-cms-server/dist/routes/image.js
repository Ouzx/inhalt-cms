/**
 * @description Image routes
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module routes/image
 *
 * @requires express
 * @requires controllers/image
 * @requires middlewares/imager
 */
import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";
import { byFile, byURL } from "../controllers/image.js";
// Create router
const router = Router();
// First upload image by file later save file url to database
router.post("/by-file", multerMiddlewareSingle, byFile);
// TODO: TEST THIS!
// Upload image by url
router.post("/by-url", byURL);
// Export router
export default router;
//# sourceMappingURL=image.js.map