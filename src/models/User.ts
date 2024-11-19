import { Schema, model, models } from "mongoose";
import { IUser } from "@/types/user";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [20, 'Username cannot be more than 20 characters'],
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    banned: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ['email', 'google', 'github'],
      required: true,
    },
    subscriptionPlan: {
      type: String,
      default: 'free',
    },
    customerId: String,
    subscriptionId: String,
    billingInterval: String,
    status: String,
    billingStart: Date,
    billingEnd: Date,
    planCanceled: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [250, 'Description cannot be more than 500 characters'],
    },
    notificationPreferences: {
      email: {
        newsletter: {
          type: Boolean,
          default: true,
        },
        newFeatures: {
          type: Boolean,
          default: true,
        },
        promotions: {
          type: Boolean,
          default: true,
        }
      },
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);