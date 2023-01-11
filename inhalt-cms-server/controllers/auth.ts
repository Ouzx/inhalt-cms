import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { iUser } from "../models/user.js";

/* Register */

/**
 * @description Register a new user body: @interface iUser
 * @route POST /auth/register
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const register = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { username, name, surname, email, password, image } =
      req.body as iUser;

    // Create salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

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
    const user = await newUser.save();

    // Return user
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/* Login */

/**
 * @description Login a user body: @interface iUser
 * @route POST /auth/login
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns { Promise<void> } *
 */
export const login = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { username, password } = req.body as iUser;

    // Search user
    const user = await User.findOne({ username });

    // If user not found throw error
    if (!user) throw new Error("User not found");

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is not valid throw error
    if (!validPassword)
      return res.status(400).json({ message: "Invalid Creadentials" });

    // Access env secret token
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("Unknown error J.23");

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
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/* Validate Token */

/**
 * @description Validate token : header - Authorization Bearer
 * @route GET /auth/validate
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns { Promise<void> } *
 */

export const validate = async (req: Request, res: Response) => {
  try {
    // Extract token from request header
    const token = req.headers.authorization?.split(" ")[1];

    // Access env secret token
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("Unknown error J.23");

    // Verify token
    const decodedData = jwt.verify(token as string, secret);

    // extract user id from token
    const _data = decodedData as { id: string };

    // Search user
    const user = await User.findById(_data.id as string).select("-password");

    // If user not found throw error
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return token
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
