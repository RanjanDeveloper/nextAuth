"use server";
import { currentUser } from "@/lib/auth";
import { AddPayerSchema } from "@/schemas";
import { insertEvent } from "@/data/events";
import * as z from "zod";
import { db } from "@/lib/db";
import { getPayersByEventId, insertPayer } from "@/data/payers";

export const addPayer = async (values: z.infer<typeof AddPayerSchema>,eventId:string) => {
  const user = await currentUser();
  const validateFields = AddPayerSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { name, city, amount  } = validateFields.data;
  const addedEvent = await insertPayer(name,amount,eventId,city);
  if (!addedEvent) {
    return { success: "Something went wrong!" };
  }
  return { success: "Event added Successfully!" };
};