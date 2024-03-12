'use server';

import { UserRoleEnum } from "@/drizzle/schemas/schema";
import { currentRole } from "@/lib/auth";

export const admin = async()=>{
    const role = await currentRole();
    if(role === UserRoleEnum.ADMIN){
        return {success:'Allowed!'}
       
    }
    return { error: 'Forbidden!'}
}