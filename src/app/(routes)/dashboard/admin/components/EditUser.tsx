'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PenBox } from 'lucide-react';
import { updateUser, deleteUser } from '@/lib/actions/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface IEditUserProps {
  userId: string;
  userEmail: string;
  role: string;
  subscriptionPlan: string;
  banned: boolean;
  username: string;
  name: string;
  onUserUpdate: () => void;
}

export function EditUser({
  userId,
  userEmail,
  role,
  subscriptionPlan,
  banned,
  username,
  name,
  onUserUpdate,
}: IEditUserProps) {
  const [userName, setUserName] = useState(name);
  const [userUsername, setUserUsername] = useState(username);
  const [userRole, setUserRole] = useState(role);
  const [userSubscriptionPlan, setUserSubscriptionPlan] = useState(subscriptionPlan);
  const [isBanned, setIsBanned] = useState(banned);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUpdateUser = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (window.confirm(`Are you sure you want to update ${userEmail}?`)) {
          const updatedUser = await updateUser(userId, {
            name: userName,
            username: userUsername,
            role: userRole,
            subscriptionPlan: userSubscriptionPlan,
            banned: isBanned,
          });
          if (updatedUser) {
            toast.success('User updated successfully');
            router.refresh();
            setIsOpen(false);
            onUserUpdate();
          }
        } else {
          toast.error('Failed to update user');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to update user');
      }
    }
  };

  const handleDelete = async (userId: string, userEmail: string) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('Are you sure you want to delete this user?')) {
        const emailConfirmation = prompt(
          `Please type the user email '${userEmail}' to delete the user:`
        );

        if (emailConfirmation === userEmail) {
          try {
            await deleteUser(userId);
            toast.success('User deleted successfully');
            router.refresh();
            setIsOpen(false);
            onUserUpdate();
          } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.');
          }
        } else {
          toast.error('Email does not match. Deletion canceled.');
        }
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PenBox />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription className="text">
            Be careful when editing user data. Changes may affect user access and billing.
          </DialogDescription>
          <hr></hr>
          <DialogDescription>
            Name: <span className="text-primary">{name}</span>
          </DialogDescription>
          <DialogDescription>
            Email: <span className="text-primary">{userEmail}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={userUsername}
              onChange={(e) => setUserUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input disabled id="email" value={userEmail} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subscriptionPlan" className="text-right">
              Plan
            </Label>
            <Select value={userSubscriptionPlan} onValueChange={setUserSubscriptionPlan}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="banned" className="text-right">
              Banned
            </Label>
            <Select
              value={isBanned.toString()}
              onValueChange={(value) => setIsBanned(value === 'true')}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Banned status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDelete(userId, userEmail)}>
            Delete user
          </Button>
          <Button variant="default" type="submit" onClick={handleUpdateUser}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
