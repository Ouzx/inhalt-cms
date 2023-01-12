var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @description Middleware for auth operations
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module middlewares/Auth
 *
 * @requires jwt : Verifying token
 * @requires express : Request, Response, NextFunction for typescript type checking
 * @requires models/user : User model
 *
 * @exports verifyToken : Verify token
 */
import jwt from "jsonwebtoken";
import User from "../models/user.js";
/**
 * @description Middleware to verify the token
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object : headers: Authorization Bearer token
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 * @returns { Promise<void> }
 */
export const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token from request headers
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // Check if token exists and return error if not
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        // Access secret from environment variables
        const secret = process.env.JWT_SECRET;
        // Check if secret exists and return error if not
        if (!secret)
            throw new Error("JWT_SECRET is not defined");
        // Verify token
        const decoded = jwt.verify(token, secret);
        // Extract user id from token
        const _data = decoded;
        // Search user
        const user = yield User.findById(_data.id).select("-password");
        // Check if user exists and return error if not
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Add user to request body
        req.body.user = user;
        // Call next function
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=auth.js.map