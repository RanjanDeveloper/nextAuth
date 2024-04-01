"use server";
import { currentUser } from "@/lib/auth";
import { AddEventsSchema } from "@/schemas";
import { insertEvent } from "@/data/events";
import * as z from "zod";
import { db } from "@/lib/db";
import { getPayersByEventId } from "@/data/payers";

export const addEvent = async (values: z.infer<typeof AddEventsSchema>) => {
  const user = await currentUser();
  const validateFields = AddEventsSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { title: name, description, eventType, date, place } = validateFields.data;
  const addedEvent = await insertEvent(user?.id!, name, eventType!, date!, place!);
  if (!addedEvent) {
    return { success: "Something went wrong!" };
  }
  return { success: "Event added Successfully!" };
};

export const getCurrentEvent = async(eventId:string)=> {
  const user = await currentUser();
  if(!user){
    return {error:"User doesnt exist !"}
  }
  const event = await db.query.events.findFirst({
    where:(events,{eq})=> eq(events.id,eventId)
  })
  if(!event || event.userId !== user.id){
    return {error:"Event doesnt exist !"}
  }
   const payers = await getPayersByEventId(event.id);

  return payers
}


