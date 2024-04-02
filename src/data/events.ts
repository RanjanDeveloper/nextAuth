'use server';
import { EventsEnum, events } from "@/drizzle/schemas/schema";
import { db } from "@/lib/db";
import {v4 as uuid} from 'uuid'
import { currentUser } from '@/lib/auth';
export const getCurrentUserEvents = async () => {
    try{
      const user = await currentUser()!;
      const events = await db.query.events.findMany({
        where:(events,{eq})=> eq(events.userId,user?.id as string)
      });
     
      return events;
    } catch {
      return null
    }
  };
export const insertEvent =  async(id:string,name:string,eventType:EventsEnum,date:Date,place:string)=> {
  try{
    const newEvent = {
      id:uuid(),
      userId:id,
      title:name,
      eventType,
      dateTime:new Date(),
      location:place

    }
    const event = await db.insert(events).values(newEvent).returning()
    return event;
  } catch {
    return null
  }
}