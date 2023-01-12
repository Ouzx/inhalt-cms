/**
 * @description Inhalt CMS Server
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @requires express : For handling HTTP requests
 * @requires mongoose : For handling MongoDB
 * @requires cors : For handling CORS
 * @requires dotenv : For environment variables
 * @requires helmet : For security
 * @requires morgan : For logging
 * @requires routes : For routes
 * @requires middlewares : For middlewares
 */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { image, post, auth } from "./routes/index.js";
import { verifyToken } from "./middlewares/auth.js";
/* Config */
/*
  Loads environment variables from .env file
  Defines the connection url for MongoDB and the port for the express server
  If the process.env.CONNECTION_URL is not found, it defaults to an empty string
  PORT defaults to 5000 if process.env.PORT is not found
*/
dotenv.config();
const CONNECTION_URL = process.env.CONNECTION_URL || "";
const PORT = process.env.PORT || 5000;
// Express
/*
  Express app instance
  Applies json and urlencoded middlewares to the app with limits of 30mb
  Uses helmet and morgan middlewares to increase security and logging
  Also uses cors middleware
*/
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
// MEDIA
/**
  Serves all files in 'public/uploads' directory as static files
  Accessible at '/media' route
*/
app.use("/media", express.static(process.cwd() + "/public/uploads/"));
// Routes
/*
  Applies auth route with '/auth' endpoint
  Applies post route with '/posts' endpoint and requires verified token
  Applies image route with '/media/imgs' endpoint and requires verified token
*/
app.use("/auth", auth);
app.use("/posts", verifyToken, post);
app.use("/media/imgs", verifyToken, image);
/* MongoDB Connection */
/*
  Disables strict query checking in mongoose
  Connects to MongoDB using CONNECTION_URL, with mongoose parser options
  If connection is successful, listens on specified PORT
  If connection failed, logs error message
*/
mongoose.set("strictQuery", false);
mongoose
    .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
//# sourceMappingURL=index.js.map