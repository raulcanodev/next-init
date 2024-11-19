import { getUserDetails } from "@/lib/actions/users";

export default async function page() {
  const userData = await getUserDetails();


  if(!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userData.name}

    </div>
  );
}
