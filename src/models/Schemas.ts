import mongoose, { Schema, model } from "mongoose";

// Interface definition for the User document
export interface User {
  id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the user model
const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    premium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define the model for the User
export const User = mongoose.models?.User || model<User>("User", UserSchema);