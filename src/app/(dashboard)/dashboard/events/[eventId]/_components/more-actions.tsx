"use client";
import React, { startTransition, useState } from "react";
import { Row } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import EditPayerDialogue from "./edit-payer-dialogue";
import { SquarePenIcon, Trash2 } from "lucide-react";
import { deletePayer } from "@/actions/payers";
import DeletePayerDialogue from "./delete-payer-dialogue";

type Props<TData> = {
  row: Row<TData>;
};

export default function MoreActions<TData>({ row }: Props<TData>) {
  const payer: any = row.original;
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const handleEditPayer = () => {
    setOpenEdit(true);
  };
  const handleDeletePayer = () => {
   setOpenDelete(true);
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
              <SquarePenIcon className="size-4 mr-2" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center font-semibold w-full grow cursor-pointer" onClick={handleDeletePayer}>
              <Trash2 className="size-4 mr-2" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openEdit && <EditPayerDialogue isOpen={openEdit} onEditPayerOpenChanges={setOpenEdit} payer={payer} />}
      {openDelete && <DeletePayerDialogue isOpen={openDelete} onDeletePayerOpenChanges={setOpenDelete} payer={payer} />}
    </>
  );
}
