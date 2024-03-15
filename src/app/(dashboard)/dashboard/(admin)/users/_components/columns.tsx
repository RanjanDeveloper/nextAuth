"use client"

import { ColumnDef } from "@tanstack/react-table"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,DropdownMenuSeparator

 } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
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
    cell:({row}) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <FiMoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log(user)}
            >
              user
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
