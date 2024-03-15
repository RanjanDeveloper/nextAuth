"use server";
import {addUser, getUserByEmail } from "@/data/users";

import { UserRoleEnum } from "@/drizzle/schemas/schema";
import { currentRole } from "@/lib/auth";
import { AddUserSchema } from "@/schemas";
import { z } from "zod";

export const admin = async () => {
  const role = await currentRole();
  if (role === UserRoleEnum.ADMIN) {
    return { success: "Allowed!" };
  }
  return { error: "Forbidden!" };
};

export const adduser = async(values:z.infer<typeof AddUserSchema>)=>{
    const validateFields = AddUserSchema.safeParse(values);
    if(!validateFields.success){
        return {error: 'Invalid Fields!'}
    }
    const {name, email, password, isTwoFactorEnabled } = validateFields.data!;
    const existingUser = await getUserByEmail(email);
      //^ check user is exist only from credentials
    if (existingUser) {
        return { error: "Email already exist" };
    }
    const emailVerified = new Date();
    const addedUser = await addUser(name,email,password,isTwoFactorEnabled,emailVerified);
    if(!addedUser){
        return {success:'Something went wrong!'}
    }
    return {success:'User added Successfully!'}
    
}

