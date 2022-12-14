import { Router } from "express";
import { login, validate } from "../controllers/auth.js";
const router = Router();
// router.post("/register", multerMiddlewareSingle, register); // REGISTER DISABLED
router.post("/login", login);
router.get("/validate-token", validate);
export default router;
//# sourceMappingURL=auth.js.map