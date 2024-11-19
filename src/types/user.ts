import { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  role: string;
  banned: boolean;
  createdAt: Date;
  subscriptionPlan: string;
  customerId?: string;
  subscriptionId?: string;
  billingInterval?: string;
  status?: string;
  billingStart?: Date;
  billingEnd?: Date;
  planCanceled: boolean;
  provider: string;
  lastLogin?: Date;
  notificationPreferences: {
    email: {
      newsletter: boolean;
      newFeatures: boolean;
      promotions: boolean;
    }
  };
}

// Types needed for the Admin Dashboard, this avoids type errors if the User model interface changes
// For example, we don't need the avatar and bio fields in the Admin Dashboard
export interface IUserAdminDashboardProps {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  banned: boolean;
  createdAt: Date;
  subscriptionPlan: string;
  customerId?: string;
  subscriptionId?: string;
  billingInterval?: string;
  status?: string;
  billingStart?: Date;
  billingEnd?: Date;
  planCanceled: boolean;
  provider: string;
  lastLogin?: Date;
}

export interface IUserTableProps {
  initialUsers: IUserAdminDashboardProps[];
  totalUsers: number
}

