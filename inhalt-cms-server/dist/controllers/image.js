/**
 * @description Image controller
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module controllers/image
 *
 * @requires express : Request, Response for typescript type checking
 *
 * @exports byFile : Upload an image by file
 * @exports byURL : Upload an image by url
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* File */
/**
 * @description Upload an image by file
 * @route POST /media/imgs/by-file
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object body: image from image middleware
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const byFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract image url from request body
        const { image } = req.body;
        // Create response
        // If image is not defined, throw an error which means success is 0
        // Else, set success to 1 and return response
        const response = { success: 0, file: { url: image } };
        if (!image)
            throw new Error(JSON.stringify(response));
        response.success = 1;
        // Return response
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* URL */
/**
 * @description Upload an image by url
 * @route POST /media/imgs/by-url
 * @access Public
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @async
 * @param {Request} req - Request object body: image from image middleware
 * @param {Response} res - Response object
 * @returns { Promise<void> }
 */
export const byURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract image url from request body
        const { image } = req.body;
        // Create response
        // If image is not defined, throw an error which means success is 0
        // Else, set success to 1 and return response
        const response = { success: 0, file: { url: image } };
        if (!image)
            throw new Error(JSON.stringify(response));
        response.success = 1;
        // Return response
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=image.js.map