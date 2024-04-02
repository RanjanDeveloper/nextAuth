"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddPayerSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPayer } from "@/actions/payers";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  isOpen:boolean,
  eventId:string,
  onAddUserOpenChanges:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPayerDialogue({isOpen,onAddUserOpenChanges,eventId}: Props) {
  const [isPending,startTransition] = useTransition();
  const form = useForm<z.infer<typeof AddPayerSchema>>({
    resolver: zodResolver(AddPayerSchema),
    defaultValues: {
      name: "",
      city: undefined,
      amount: 0,
    },
  });

  const submitHandler = (values: z.infer<typeof AddPayerSchema>) => {
    startTransition(() => {
      addPayer(values,eventId as string)
        .then(data => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            onAddUserOpenChanges(false);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onAddUserOpenChanges} modal>
          <DialogContent onInteractOutside={(e) => {
          e.preventDefault();
        }}>
          <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader className="font-bold">Add Payer</DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Ranjan" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Place</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Kannikapuri" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={field.onChange}  placeholder="Enter amount" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="size-4 mr-2 animate-spin"/>} Add
              </Button>
            </DialogFooter>
            </form>
      </Form>
          </DialogContent>
 
    </Dialog>
  );
}
