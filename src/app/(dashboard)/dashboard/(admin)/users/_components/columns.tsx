"use client"

import { ColumnDef } from "@tanstack/react-table"

import MoreActions from "./more-actions";
import Hi from "./hi";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string
  name: string | null
  email: string
  isTwoFactorEnabled:boolean | null
}
export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: "IsTwoFactorEnabled",
  },
  {
    id:'actions',
    cell:({row}) => <MoreActions row={row}/>,
  
  }
]
