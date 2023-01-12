/**
 * @description User schema
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @module models/user
 *
 * @requires mongoose : Schema, model for typescript type checking
 *
 * @exports iUser : User interface
 * @exports default : User model
 */
import { Schema, model } from "mongoose";
/**
 * @description User schema
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 *
 * @const
 * @type {Schema<iUser>}
 * @implements {iUser}
 */
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 1024,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1024,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});
// Create user model
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map