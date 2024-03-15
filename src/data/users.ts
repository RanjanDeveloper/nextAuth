'use server';
import { db } from "@/lib/db";
import { UserRoleEnum, user } from "../drizzle/schemas/schema";
import bcrypt from  'bcryptjs';
import {v4 as uuid} from 'uuid';
export const getUsers = async () => {
  try{
    const users = await db.query.user.findMany();
    return users;
  } catch {
    return null
  }
};

export const getUserByEmail = async(email:string)=>{
  try {
    
    const user =await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  
    return user;
  } catch { 
    return null;
  }
}

export const getUsersByRole = async(role:UserRoleEnum)=>{
  try {
    
    const user =await db.query.user.findMany({
      columns:{
        id:true,
        name:true,
        email:true,
        isTwoFactorEnabled:true
      },
      where: (user, { eq }) => eq(user.userRole, role),
    });
  
    return user;
  } catch { 
    return null;
  }
}

export const getUserById = async(id:string)=>{
  try {
    
    const user =await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  } catch { 
    return null;
  }
}

export const addUser = async (name:string,email: string, password: string,isTwoFactorEnabled?:boolean,emailVerified?:Date ) => {
  try {
    // 1. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // 2. Create the new admin record
    const newAdmin = {
      id:uuid(),
      name,
      email,
      password: hashedPassword,
      isTwoFactorEnabled,
      emailVerified,
      // Add other fields as needed (name, username, etc.)
    };

    // 3. Perform the insert operation
    const insertedUser = await db.insert(user).values(newAdmin).returning();
    return insertedUser;
  } catch (error) {
    // 5. Handle errors
    console.error('Error adding admin:', error);
    // Handle error appropriately, e.g., throw, log, or display a user-friendly message
  }
};