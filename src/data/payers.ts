'use server';
import { AddEventSchema } from '@/schemas';
import { EventsEnum, events, payers } from "@/drizzle/schemas/schema";
import { db } from "@/lib/db";
import { z } from 'zod';
import {v4 as uuid} from 'uuid'
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

