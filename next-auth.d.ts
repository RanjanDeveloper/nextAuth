import { typeAdapterAccount } from '@auth/core/adapters';
import { UserRoleEnum } from "@/drizzle/schemas/schema";
import  {  type DefaultSession } from "next-auth";
// import { UserRole } from "@/drizzle/schemas/schema";
export type defaultUser = DefaultSession["user"];

declare module "next-auth" {

  interface User {
      picture?:string,
      role?: UserRoleEnum;
      isTwoFactorEnabled?: boolean;
      isOAuth?:boolean;
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
