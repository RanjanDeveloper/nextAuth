import { UserRoleEnum } from "@/drizzle/schemas/schema";
import { type DefaultSession } from "next-auth";
// import { UserRole } from "@/drizzle/schemas/schema";


export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoleEnum;
  isTwoFactorEnabled: boolean;
  isOAuth:boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
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
