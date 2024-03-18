"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormDescription, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { EditUserSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { edituser } from "@/actions/admin";
import { FiEdit } from "react-icons/fi";
type Props = {
    user:any,
    isOpen:boolean,
    setIsOpen:()=> void;
}

export default function EditUser({user,isOpen,setIsOpen}: Props){
//   const user = useCurrentUser();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      password:undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined,
    },
  });
  console.log({user})
  const [isPending, startTransition] = useTransition();
  const submitHandler = (values: z.infer<typeof EditUserSchema>) => {
    startTransition(() => {
      const id:string = user.id;
      edituser(values,id)
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
    
          <DialogContent>
          <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader>Edit User</DialogHeader>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="John Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Johndoe@gmail.com" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="spece-y-0.5">
                        <FormLabel showError={false}>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable two factor authentication for your account</FormDescription>
                      </div>
                      <FormControl>
                        <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
            </form>
      </Form>
          </DialogContent>
 
    </Dialog>
  );
}
