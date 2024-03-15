
import { getUsersByRole } from "@/data/users";
import { UserRoleEnum } from "@/drizzle/schemas/schema";
import React from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import Adduser from "./_components/add-user";
import Rolegate from "@/components/auth/role-gate";


type Props = {};

export default async function Userspage({}: Props) {

  const users: any = await getUsersByRole(UserRoleEnum.USER);
  console.log("users", { users });
  return (
    <Rolegate allowedRole={UserRoleEnum.ADMIN}>
      <div className="container bg-white mx-auto py-10">
        <div className="space-y-3">
          <div className="flex justify-end">
            <Adduser />
          </div>
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </Rolegate>
  );
}
