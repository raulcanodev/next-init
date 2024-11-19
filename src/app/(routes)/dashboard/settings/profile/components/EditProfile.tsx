"use client";
import { IUser } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage, Button, Card, Input } from '@/components/ui';

interface EditProfileProps {
  userData: IUser;
}

export function EditProfile({ userData }: EditProfileProps) {
  return (
    <>
      <Card
        className={
          'mb-5 h-min flex items-center aligh-center max-w-full py-8 px-4 dark:border-zinc-800'
        }
      >
        <Avatar className="min-h-[68px] min-w-[68px]">
          <AvatarImage src={userData?.avatar} alt={userData?.name} />
          <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-extrabold text-zinc-950 leading-[100%] dark:text-white pl-4 md:text-3xl">
            {userData?.name}
          </p>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-2 pl-4 md:text-base">
            {userData?.bio}
          </p>
        </div>
      </Card>
      <Card className={'mb-5 h-min max-w-full pt-8 pb-6 px-6 dark:border-zinc-800'}>
        <p className="text-xl font-extrabold text-zinc-950 dark:text-white md:text-3xl">
          Account Details
        </p>
        <p className="mb-6 mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-4 md:text-base">
          Here you can change your account information
        </p>
        <label
          className="mb-3 flex cursor-pointer px-2.5 font-bold leading-none text-zinc-950 dark:text-white"
          htmlFor={'name'}
        >
          Your Name
          <p className="ml-1 mt-[1px] text-sm font-medium leading-none text-zinc-500 dark:text-zinc-400">
            (30 characters maximum)
          </p>
        </label>
        <div className="mb-8 flex flex-col md:flex-row">
          <form
            className="w-full"
            id="nameForm"
            // onSubmit={(e) => handleSubmitName(e)}
          >
            <Input
              type="text"
              name="fullName"
              // defaultValue={props.user?.user_metadata.full_name ?? ''}
              defaultValue={userData?.name}
              placeholder="Please enter your full name"
              className={`mb-2 mr-4 flex h-full w-full px-4 py-4 outline-none md:mb-0`}
            />
          </form>
          <Button
            className="flex h-full max-h-full w-full items-center justify-center rounded-lg px-4 py-4 text-base font-medium md:ms-4 md:w-[300px]"
            form="nameForm"
            type="submit"
          >
            Update name
          </Button>
          <div className="mt-8 h-px w-full max-w-[90%] self-center bg-zinc-200 dark:bg-white/10 md:mt-0 md:hidden" />
        </div>
        <p className={`mb-5 px-2.5 text-red-500 md:px-9`}></p>
        <label
          className="mb-3 ml-2.5 flex cursor-pointer px-2.5 font-bold leading-none text-zinc-950 dark:text-white"
          htmlFor={'email'}
        >
          Your Email
          <p className="ml-1 mt-[1px] text-sm font-medium leading-none text-zinc-500 dark:text-zinc-400">
            (We will email you to verify the change)
          </p>
        </label>

        <div className="mb-8 flex flex-col md:flex-row">
          <form
            className="w-full"
            id="emailForm"
            // onSubmit={(e) => handleSubmitEmail(e)}
          >
            <Input
              placeholder="Please enter your email"
              disabled
              defaultValue={userData?.email}
              type="text"
              name="newEmail"
              className={`mr-4 flex h-full max-w-full w-full items-center justify-center px-4 py-4 outline-none`}
            />
          </form>
        </div>
      </Card>
    </>
  );
}
