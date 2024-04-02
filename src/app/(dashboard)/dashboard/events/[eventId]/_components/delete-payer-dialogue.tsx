import React, { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Payers } from "./columns";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { deletePayer } from "@/actions/payers";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
type Props = {
  isOpen: boolean;
  onDeletePayerOpenChanges: React.Dispatch<React.SetStateAction<boolean>>;
  payer: Payers;
};

export default function DeletePayerDialogue({ isOpen, onDeletePayerOpenChanges, payer }: Props) {
  const [isPending, startTransition] = useTransition();
  const handlePayerDelete = () => {
    startTransition(() => {
      const id: string = payer.id;
      deletePayer(id)
        .then(data => {
          if (data?.error) {
            toast.error(data.error)
          }
          if (data?.success) {
            toast.success(data.success)
            onDeletePayerOpenChanges(false);
          }
        
        })
        .catch(() => toast.error("Something went wrong!")).finally(()=>{
           
        });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onDeletePayerOpenChanges}>
      <DialogContent onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" disabled={isPending} onClick={handlePayerDelete}>
          {isPending && <Loader2 className="size-4 mr-2 animate-spin"/>}Delete 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
