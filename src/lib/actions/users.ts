'use server';

import { mongooseConnection } from '@/lib/db/mongoclient';
import { revalidatePath } from 'next/cache';
import { User } from '@/models/User';
import { IUser, IUserAdminDashboardProps } from '@/types/user';
import { getServerSession } from 'next-auth';

// Ensure mongoose connection is established
mongooseConnection
  .then(() => console.log('Mongoose connected'))
  .catch((err) => console.error('Mongoose connection error:', err));

export async function getUsers(
  page: number,
  pageSize: number,
  searchTerm: string = ''
): Promise<IUserAdminDashboardProps[]> {
  const skip = (page - 1) * pageSize;

  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(query).skip(skip).limit(pageSize).lean();

  return users.map((user) => ({
    _id: user._id ? user._id.toString() : 'N/A',
    name: user.name || 'N/A',
    username: user.username || 'N/A',
    email: user.email || 'N/A',
    role: user.role || 'N/A',
    banned: user.banned || false,
    createdAt: user.createdAt || 'N/A',
    subscriptionPlan: user.subscriptionPlan || 'N/A',
    customerId: user.customerId || 'N/A',
    subscriptionId: user.subscriptionId || 'N/A',
    billingInterval: user.billingInterval || 'N/A',
    status: user.status || 'N/A',
    billingStart: user.billingStart || 'N/A',
    billingEnd: user.billingEnd || 'N/A',
    planCanceled: user.planCanceled || false,
    provider: user.provider || 'N/A',
    lastLogin: user.lastLogin || 'N/A',
  })) as IUserAdminDashboardProps[];
}

export async function searchUsers(searchTerm: string, page: number, pageSize: number) {
  return getUsers(page, pageSize, searchTerm);
}

export async function getTotalUsers(searchTerm: string = '') {
  const escapedSearchTerm = searchTerm.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');

  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: escapedSearchTerm, $options: 'i' } },
          { email: { $regex: escapedSearchTerm, $options: 'i' } },
        ],
      }
    : {};

  return User.countDocuments(query);
}

export async function deleteUser(userId: string) {
  const result = await User.findByIdAndDelete(userId);

  if (!result) {
    throw new Error('User not found or delete operation failed');
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function updateUser(userId: string, updateData: Partial<IUser>) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    // If the username is provided, remove any leading/trailing whitespace
    const safeUpdateData = { ...updateData };
    if (safeUpdateData.username) {
      safeUpdateData.username = safeUpdateData.username.replace(/\s+/g, '');
    }

    delete safeUpdateData._id;
    delete safeUpdateData.createdAt;

    const updatedUser = (await User.findByIdAndUpdate(
      userId,
      { $set: safeUpdateData },
      { new: true, runValidators: true, lean: true }
    )) as IUser | null;

    if (!updatedUser) {
      throw new Error('User not found');
    }

    // Revalidate paths
    // revalidatePath('/'); //? Check if this is necessary

    // Convert complex fields for client compatibility
    return {
      ...updatedUser,
      _id: updatedUser._id ? updatedUser._id.toString() : '',
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function getUserDetails(): Promise<IUser | null> {
  const session = await getServerSession();

  try {
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      console.warn('User not found in getUserDetails');
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    return null;
  }
}
