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
import { Document, Schema, model } from "mongoose";

/**
 * @description User interface
 * @version 1.0.0
 * @author Ouzx
 * @date 1/11/2023 - 11:30:33 PM
 * @interface iUser
 *
 * @property {string} username - User username
 * @property {string} name - User name
 * @property {string} surname - User surname
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} image - User image
 * @property {Date} createdAt - User created date
 */
export interface iUser extends Document {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  image: string;
  createdAt: Date;
}

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
const userSchema = new Schema<iUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Create user model
const User = model("User", userSchema);

export default User;
