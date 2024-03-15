import { UserRoleEnum } from "@/drizzle/schemas/schema";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("This is not a valid email"),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("This is not a valid email"),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
  // terms: z.coerce.boolean().refine(bool => bool == true, {
  //   message: "You must agree to our terms and conditions",
  // }),
});

export const ResetSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("This is not a valid email"),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
});
export const AddUserSchema= z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email("This is not a valid email"),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
  isTwoFactorEnabled:z.boolean(),
});


export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRoleEnum.ADMIN, UserRoleEnum.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    data => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    data => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
