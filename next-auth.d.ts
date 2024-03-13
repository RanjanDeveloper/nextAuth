import { user } from './src/drizzle/schemas/schema';
import { typeAdapterAccount } from '@auth/core/adapters';
import { UserRoleEnum } from "@/drizzle/schemas/schema";
import  {  type DefaultSession } from "next-auth";
// import { UserRole } from "@/drizzle/schemas/schema";
export type defaultUser = DefaultSession["user"];

declare module "next-auth" {
  // interface Session {
  //   user:  defaultUser
  // }

  interface User {
      picture?:string | null,
      role: UserRoleEnum ;
      isTwoFactorEnabled: boolean | null;
      isOAuth:boolean | null;
  }

}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRoleEnum;
    isTwoFactorEnabled: boolean;
    isOAuth:boolean;

  }
}
