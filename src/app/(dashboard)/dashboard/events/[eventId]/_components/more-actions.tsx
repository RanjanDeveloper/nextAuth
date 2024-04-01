import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import EditUserDialogue from "./edit-payer-dialogue";
import { SquarePenIcon } from "lucide-react";

type Props<TData> = {
  row: Row<TData>;
};

export default function MoreActions<TData>({ row }: Props<TData>) {
  const user = row.original;
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleEditPayer = () => {
    setOpenEdit(true);
  };

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
            <div className="flex items-center font-semibold w-full grow cursor-pointer" onClick={handleEditPayer}>
              <SquarePenIcon className="h-4 w-4 mr-2" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      {openEdit && <EditUserDialogue isOpen={openEdit}  onEditUserOpenChanges={setOpenEdit} user={user} />}
    </>
  );
}
