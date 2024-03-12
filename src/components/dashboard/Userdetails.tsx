import { getUsers } from "@/data/adminService";

export default async function Userdetails() {
  // const users = await getAdmins();
  const admins = await getUsers();
  console.log("server");
  return admins?.map((admin: any) => <div>{admin.username}</div>);
}
