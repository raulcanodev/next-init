import { EditProfile } from './components/EditProfile';
import { getUserDetails } from '@/lib/actions/users';

export default async function UserProfile() {
  const userData = await getUserDetails();

  if (!userData) {
    return <div>User not found</div>
  }

  return (
    <div className="relative mx-auto flex w-max max-w-full flex-col md:pt-[unset] lg:pt-[100px] lg:pb-[100px]">
      <div className="maw-w-full mx-auto w-full flex-col justify-center md:w-full md:flex-row xl:w-full">
        <EditProfile userData={userData} />
      </div>
    </div>
  )
}