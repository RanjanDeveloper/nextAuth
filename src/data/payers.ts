'use server';
import { AddEventSchema } from '@/schemas';
import { EventsEnum, events, payers } from "@/drizzle/schemas/schema";
import { db } from "@/lib/db";
import { z } from 'zod';
import {v4 as uuid} from 'uuid'
import { currentUser } from '@/lib/auth';
import { sql,eq,sum} from 'drizzle-orm';
export const getPayersByEventId = async (eventId:string) => {
    try{
      const payers = await db.query.payers.findMany({
        where:(payers,{eq})=> eq(payers.eventId,eventId)
      });
      return payers;
    } catch {
      return null
    }
  };

  export const insertPayer = async (name:string,amount:number,eventId:string,city?: string) => {
    try {
      // 1. Hash the password securely
    
  
      // 2. Create the new admin record
      const newPayer = {
        id:uuid(),
       
        name,
        eventId,
        city,
        amount
      };
  
      // 3. Perform the insert operation
      const insertedUser = await db.insert(payers).values(newPayer).returning();
      return insertedUser;
    } catch (error) {
      // 5. Handle errors
      console.error('Error adding admin:', error);
      // Handle error appropriately, e.g., throw, log, or display a user-friendly message
    }
  };
  export const getCurrentUserPayers = async () => {
    try {
      const user = await currentUser()!;
      const payersData = await db.select({
        name:sql<string>`lower(${payers.name})`.as('name'),
        title:events.title,
        userId:events.userId,
        location:sql<string>`lower(${payers.city})`.as('location'),
        eventId:payers.eventId,
        amount:sum(payers.amount).as('amount')
      }).from(payers).leftJoin(events,eq(payers.eventId,events.id)).groupBy(sql`lower(${payers.name})`,sql`lower(${payers.city})`,events.id,payers.eventId).as('payersData');
      const result = await db.select({
        name:sql<string>`lower(${payersData.name})`,
        amount:sum(payersData.amount),
        location:sql<string>`lower(${payersData.location})`,
        events: sql<string>`array_agg(${payersData.title})`.as('events'),
      }).from(payersData).groupBy(sql`lower(${payersData.name})`,sql`lower(${payersData.location})`).where(eq(payersData.userId,user?.id as string));
 
      console.log(result);
      return result;
    } catch(error) {
      console.log(error);
      return null;
    }
  };
