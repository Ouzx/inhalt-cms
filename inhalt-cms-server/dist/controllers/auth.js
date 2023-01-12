var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
/* Register */
/**
 * @description Register a new user
 * @route POST /auth/register
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object body: @interface iUser
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user data from request body
        const { username, name, surname, email, password, image } = req.body;
        // Create salt
        const salt = yield bcrypt.genSalt(10);
        // Hash password
        const hashedPassword = yield bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({
            username,
            name,
            surname,
            email,
            password: hashedPassword,
            image,
        });
        // Save user
        const user = yield newUser.save();
        // Return user
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* Login */
/**
 * @description Login a user
 * @route POST /auth/login
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object body: @interface iUser
 * @param {Response} res - Response object
 * @returns { Promise<void> } *
 */
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user data from request body
        const { username, password } = req.body;
        // Search user
        const user = yield User.findOne({ username });
        // If user not found throw error
        if (!user)
            throw new Error("User not found");
        // Compare password
        const validPassword = yield bcrypt.compare(password, user.password);
        // If password is not valid throw error
        if (!validPassword)
            return res.status(400).json({ message: "Invalid Creadentials" });
        // Access env secret token
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("Unknown error J.23");
        // Create token
        const accessToken = jwt.sign({ id: user._id }, secret);
        // Return user data
        const tempUser = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
        };
        res.status(200).json({ accessToken, user: tempUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* Validate Token */
/**
 * @description Validate token
 * @route GET /auth/validate-token
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object : header - Authorization Bearer
 * @param {Response} res - Response object
 * @returns { Promise<void> } *
 */
export const validate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract token from request header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // Access env secret token
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("Unknown error J.23");
        // Verify token
        const decodedData = jwt.verify(token, secret);
        // extract user id from token
        const _data = decodedData;
        // Search user
        const user = yield User.findById(_data.id).select("-password");
        // If user not found throw error
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Return token
        res.status(200).json({ token });
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