"use client";
import React, { useState, useEffect, useTransition,useRef,useCallback } from "react";
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
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getPayerDetailsByName } from "@/data/payers";
import { useClickAway,useDebounce } from 'react-use';
import { Textarea } from "@/components/ui/textarea";
type Props = {
  isOpen: boolean;
  eventId: string;
  onAddUserOpenChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPayerDialogue({ isOpen, onAddUserOpenChanges, eventId }: Props) {
  const filterRef = useRef(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false); // Track selection visibility
  const [isLoading, setIsLoading] = useState(false); // Track fetching state
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(query);
    },
    300,
    [query]
  );
// Combine debouncing and fetching logic using useCallback
const fetchSuggestions = useCallback(async () => {
  try {
    if (!debouncedValue) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const response = await getPayerDetailsByName(debouncedValue);
    setSuggestions(response);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  } finally {
    setIsLoading(false);
  }
}, [debouncedValue, getPayerDetailsByName]);
useEffect(() => {
  fetchSuggestions();
}, [fetchSuggestions, debouncedValue]); // Only refetch when query changes
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AddPayerSchema>>({
    resolver: zodResolver(AddPayerSchema),
    defaultValues: {
      name: "",
      city: undefined,
      description:undefined,
      amount: 0,
     
    },
  });

  const submitHandler = (values: z.infer<typeof AddPayerSchema>) => {
    startTransition(() => {
      addPayer(values, eventId as string)
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,field:any) => {
    field.onChange(e.target.value);
    setQuery(e.target.value);
    if(e.target.value === ''){
      setIsSelectionOpen(false); // Open suggestions on input change
      setIsLoading(false); // Start loading indicator
      setSuggestions([]);
    }
    else{
      setIsSelectionOpen(true); // Open suggestions on input change
      setIsLoading(true); // Start loading indicator
    }
    
  };
  useClickAway(filterRef, () => {
    setIsSelectionOpen(false); // Open suggestions on input change
  });
const handleSuggestClick = (suggestion:any)=> {
  form.setValue('name', suggestion.name);
  form.setValue('city', suggestion.city);
  setIsSelectionOpen(false); // Close suggestions on selection
}
  return (
    <Dialog open={isOpen} onOpenChange={onAddUserOpenChanges} modal>
      <DialogContent
        onInteractOutside={e => {
          e.preventDefault();
        }}
      >
        <Form {...form} >
          <form autoComplete="off" className="space-y-6" onSubmit={form.handleSubmit(submitHandler)}>
            <DialogHeader className="font-bold">Add Payer</DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel showError={false}>Name</FormLabel>
                    <FormControl >
                      <div ref={filterRef} className="relative">
                      <Input 
                        {...field}
                        type="text" 
                        onChange={(e)=>handleInputChange(e,field)}
                        placeholder="Ranjan"
                        disabled={isPending}
                      />
                      {isSelectionOpen && (
                        <ul className="bg-white divide-y border max-h-32 rounded-md overflow-y-auto w-full left-0 top-[calc(100%+2px)] shadow p-2 text-sm absolute">
                          {isLoading ? (
                            <li className="text-center">Loading...</li>
                          ) : (
                            suggestions.length === 0 ? (
                              <li className="text-center">No results found</li>
                            ) : (
                              suggestions.map((suggestion: any, index: any) => (
                                <li
                                  onClick={() => handleSuggestClick(suggestion)}
                                  className="flex justify-between cursor-pointer"
                                  key={index}
                                >
                                  <span>{suggestion.name}</span>
                                  <span>{suggestion.city ?? 'N/A'}</span>
                                </li>
                              ))
                            )
                          )}
                        </ul>
                      )}
                      </div>
                    
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
                    <FormLabel showError={false}>Place(Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Kannikapuri" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
       
              <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
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
                      <Input {...field} type="number" onChange={field.onChange} placeholder="Enter amount" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="size-4 mr-2 animate-spin" />} Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
