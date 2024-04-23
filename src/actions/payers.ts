
"use server";
import { currentUser } from "@/lib/auth";
import { AddPayerSchema, EditPayerSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { insertPayer } from "@/data/payers";
import { payers } from "@/drizzle/schemas/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addPayer = async (values: z.infer<typeof AddPayerSchema>, eventId: string) => {
  const validateFields = AddPayerSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { name, city, amount,description } = validateFields.data;
  const addedEvent = await insertPayer(name, amount, eventId, city,description);
  if (!addedEvent) {
    return { success: "Something went wrong!" };
  }
  revalidatePath("/dashboard/events/[evnetId]");
  return { success: "Event added Successfully!" };
};
export const editPayer = async (values: z.infer<typeof EditPayerSchema>, id: string) => {
  const validateFields = EditPayerSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, city, amount, description } = validateFields.data;
  const updatedPayer = await db.update(payers).set({ name, city, amount,description }).where(eq(payers.id, id));
  if (!updatedPayer) {
    return { error: "Something went wrong!" };
  }
  revalidatePath(`dashboard/events/[eventId]`)
  return {success:"Updated successfully!"}
};

export const deletePayer = async (id: string) => {

  const updatedPayer = await db.delete(payers).where(eq(payers.id, id));
  if (!updatedPayer) {
    return { error: "Something went wrong!" };
  }
  revalidatePath(`dashboard/events/[eventId]`)
  return {success:"Deleted successfully!"}
};
