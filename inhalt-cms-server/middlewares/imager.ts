/**
 * @description Middleware for image operations
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module middlewares/imager
 *
 * @requires multer : Uploading images
 * @requires FileFilterCallback : for typescript type checking
 * @requires express : Request, Response, NextFunction for typescript type checking
 *
 * @exports multerMiddlewareSingle : Upload single image
 */

import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

// file filter for images
/**
 * @description File filter for images
 * @access Private
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @param {Request} req - Request object
 * @param {Express.Multer.File} file - File object
 * @param {FileFilterCallback} cb - Callback function
 * @returns {void}
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Accept images only
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * @description Storage for images
 * @access Private
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @param {Request} req - Request object
 * @param {Express.Multer.File} file - File object
 * @param {FileFilterCallback} cb - Callback function *
 * @returns {void}
 */
const storage = multer.diskStorage({
  // destination for files
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/public/uploads/");
  },
  // generate unique name for files
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        file.originalname.replace(/\s+/g, "-")
    );
  },
});

// This functions `Disabled` because of the new image upload system from the client side
// It can upload multiple images one by one
// So thats why its not needed anymore
/*
const upload = multer({ fileFilter, storage }).array("images", 12);
export default function multerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) return res.send({ status: err });
    else if (err) return res.send({ status: err });

    req.body.contentImages = (req.files as Express.Multer.File[]).map(
      (file: any) => `${process.env.SERVER_URL}/uploads/${file.filename}`
    );

    if (req.body.fileUrls && req.body.fileUrls.length > 0)
      req.body.coverImage = req.body.fileUrls.shift();

    next();
  });
}
*/

// Configurations for single image upload
const uploadSingle = multer({ fileFilter, storage }).single("image");

/**
 * @description Upload single image
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @param {Request} req - Request object : req.file will be used here
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 * @returns {void} *
 */
export function multerMiddlewareSingle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Upload image
  // TODO: Use try-catch here and throw errors
  uploadSingle(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // console.log(err);
      // Return multer errors
      return res.send({ status: err });
    } else if (err) {
      // console.log(err);
      // Return other errors
      return res.send({ status: err });
    }

    // Set image url to req.body.image
    req.body.image = `${process.env.SERVER_URL}/media/${
      (req.file as Express.Multer.File).filename
    }`;

    // Call next function
    next();
  });
}
