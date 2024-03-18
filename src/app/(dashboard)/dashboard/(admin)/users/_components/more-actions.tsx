import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import EditUser from "./edit-user";
import { Users } from "./columns";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FiEdit } from "react-icons/fi";

type Props<TData> = {
  row: Row<TData>;
};

export default function MoreActions<TData>({ row }: Props<TData>) {
    const user = row.original;
    const [editDialogueOpen,setEditDialogueOpen] = useState<boolean>(false);
    const handleEdit = ()=> {
        setEditDialogueOpen(!editDialogueOpen);
    }
 
  return (
   <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <FiMoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
            <div className="flex items-center font-semibold cursor-pointer" onClick={handleEdit}>
            <FiEdit className="h-4 w-4 mr-2" />Edit
            </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
    {editDialogueOpen && <EditUser setIsOpen={handleEdit}  isOpen={editDialogueOpen} user={user}/>}
   </>
  );
}
