"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormDescription, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { AddPayerSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPayer } from "@/actions/payers";

type Props = {
  isOpen:boolean,
  eventId:string,
  onAddUserOpenChanges:any;
};

export default function AddPayerDialogue({isOpen,onAddUserOpenChanges,eventId}: Props) {

  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const form = useForm<z.infer<typeof AddPayerSchema>>({
    resolver: zodResolver(AddPayerSchema),
    defaultValues: {
      name: "",
      city: undefined,
      amount: 0,
    },
  });
  const [isPending, startTransition] = useTransition();
  const submitHandler = (values: z.infer<typeof AddPayerSchema>) => {
    startTransition(() => {
      addPayer(values,eventId as string)
        .then(data => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onAddUserOpenChanges}>
          <DialogContent>
          <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader className="font-bold">Add Payer {eventId}</DialogHeader>

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
                    <FormLabel showError={false}>Email</FormLabel>
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
                      <Input {...field} type="number"onChange={(event)=>field.onChange(event?.target.valueAsNumber)}  placeholder="Enter amount" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
            </form>
      </Form>
          </DialogContent>
 
    </Dialog>
  );
}
