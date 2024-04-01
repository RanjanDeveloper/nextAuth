import { datetime } from 'drizzle-orm/mysql-core';


'use server';
import { AddEventsSchema } from '@/schemas';
import { EventsEnum, events } from "@/drizzle/schemas/schema";
import { db } from "@/lib/db";
import { z } from 'zod';
import {v4 as uuid} from 'uuid'
export const getEventsById = async (id:string) => {
    try{
      const events = await db.query.events.findMany({
        where:(events,{eq})=> eq(events.userId,id)
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