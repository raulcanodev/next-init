import { getTotalUsers, getUsers } from "@/lib/actions/users"
import { UserTable } from "./components/DataTable"

export default async function AdminPage() {
  const totalUsers = await getTotalUsers()
  const initialUsers = await getUsers(1, 10)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <UserTable initialUsers={initialUsers} totalUsers={totalUsers} />
    </div>
  )
}