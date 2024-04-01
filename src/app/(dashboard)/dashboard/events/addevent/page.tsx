"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { Input } from "@/components/ui/input";
import { AddEventsSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEvent } from "@/actions/events";
import { EventsEnum } from "@/drizzle/schemas/schema";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";


type Props = {};

export default function AddEventsPage({}: Props) {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isCalenderOpen, setIsCalenderOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof AddEventsSchema>>({
    resolver: zodResolver(AddEventsSchema),
    defaultValues: {
      title: "",
      eventType: undefined,
      date: undefined,
      place: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const submitHandler = (values: z.infer<typeof AddEventsSchema>) => {
    startTransition(() => {
      addEvent(values)
        .then(data => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <div className="max-w-96">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
          <DialogHeader className="font-bold">Add Event</DialogHeader>

          <div className="space-y-4 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel showError={false}>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter the event name" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel showError={false}>Event type</FormLabel>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={EventsEnum.MARRIAGE}>Marriage</SelectItem>
                      <SelectItem value={EventsEnum.ENGAGEMENT}>Engagement</SelectItem>
                      <SelectItem value={EventsEnum.FUNERAL}>Funeral</SelectItem>
                      <SelectItem value={EventsEnum.OTHER}>Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel showError={false}>Event Date</FormLabel>
                  <Popover open={isCalenderOpen} onOpenChange={setIsCalenderOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline"  className={cn("w-full",!field.value && "text-slate-500")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="size-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="">
                      <Calendar
                        mode="single"
                        className="!p-0"
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date);
                          setIsCalenderOpen(false);
                        }}
                        disabled={date => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel showError={false}>Place</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter the event place" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormSuccess message={success} />
          <FormError message={error} />

          <DialogFooter className="sm:justify-start">
            <Button type="submit" disabled={isPending}>
              Add
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
