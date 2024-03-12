// import { int, mysqlTable, varchar, text, datetime, primaryKey, mysqlEnum, boolean } from "drizzle-orm/mysql-core";
// import type { AdapterAccount } from "@auth/core/adapters";
// import { relations } from "drizzle-orm";
// export enum UserRoleEnum {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }
// export const UserRole = mysqlEnum("UserRole", ["ADMIN", "USER"]);
// export const user = mysqlTable("user", {
//   id: varchar("id", { length: 255 }).notNull().primaryKey(),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   emailVerified: datetime("emailVerified"),
//   image: varchar("image", { length: 255 }),
//   userRole: UserRole.default(UserRoleEnum.USER),
//   password: varchar("password", { length: 255 }),
//   isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
// });

// export const accounts = mysqlTable(
//   "account",
//   {
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => user.id, { onDelete: "cascade" }),
//     type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
//     refresh_token: varchar("refresh_token", { length: 255 }),
//     access_token: varchar("access_token", { length: 255 }),
//     expires_at: int("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: varchar("id_token", { length: 2048 }),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   account => ({
//     pk: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// );

// export const verificationToken = mysqlTable(
//   "verificationToken",
//   {
//     id: varchar("id", { length: 255 }).notNull().primaryKey(),
//     email: varchar("email", { length: 255 }),
//     token: text("token").unique(),
//     expires: datetime("expires"),
//   },
//   verificationToken => ({
//     pk: primaryKey({
//       columns: [verificationToken.email, verificationToken.token],
//     }),
//   })
// );

// export const passwordResetToken = mysqlTable(
//   "passwordResetToken",
//   {
//     id: varchar("id", { length: 255 }).notNull().primaryKey(),
//     email: varchar("email", { length: 255 }),
//     token: text("token").unique(),
//     expires: datetime("expires"),
//   },
//   passwordResetToken => ({
//     pk: primaryKey({
//       columns: [passwordResetToken.email, passwordResetToken.token],
//     }),
//   })
// );

// export const twoFactorToken = mysqlTable(
//   "twoFactorToken",
//   {
//     id: varchar("id", { length: 255 }).notNull().primaryKey(),
//     email: varchar("email", { length: 255 }),
//     token: text("token").unique(),
//     expires: datetime("expires"),
//   },
//   twoFactorToken => ({
//     pk: primaryKey({
//       columns: [twoFactorToken.email, twoFactorToken.token],
//     }),
//   })
// );

// export const twoFactorConfirmation = mysqlTable("twoFactorConfirmation", {
//   id: varchar("id", { length: 255 }).notNull().primaryKey(),
//   userId: varchar("userId", { length: 255 })
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
// });

// export const userRelations = relations(user, ({ one }) => ({
//   accounts: one(accounts, {
//     fields: [user.id],
//     references: [accounts.userId],
//   }),
//   twoFactorConfirmation: one(twoFactorConfirmation, {
//     fields: [user.id],
//     references: [twoFactorConfirmation.userId],
//   }),
// }));
import { integer, pgTable, varchar, text, timestamp, primaryKey, pgEnum, boolean } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
export enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
export const UserRole = pgEnum("UserRole", ["ADMIN", "USER"]);
export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified"),
  image: varchar("image", { length: 255 }),
  userRole: UserRole('userRole').default('USER'),
  password: varchar("password", { length: 255 }),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  account => ({
    pk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationToken = pgTable(
  "verificationToken",
  {
    id: varchar("id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    token: text("token").unique(),
    expires:timestamp("expires"),
  },
  verificationToken => ({
    pk: primaryKey({
      columns: [verificationToken.email, verificationToken.token],
    }),
  })
);

export const passwordResetToken = pgTable(
  "passwordResetToken",
  {
    id: varchar("id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    token: text("token").unique(),
    expires: timestamp("expires"),
  },
  passwordResetToken => ({
    pk: primaryKey({
      columns: [passwordResetToken.email, passwordResetToken.token],
    }),
  })
);

export const twoFactorToken = pgTable(
  "twoFactorToken",
  {
    id: varchar("id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    token: text("token").unique(),
    expires: timestamp("expires"),
  },
  twoFactorToken => ({
    pk: primaryKey({
      columns: [twoFactorToken.email, twoFactorToken.token],
    }),
  })
);

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const userRelations = relations(user, ({ one }) => ({
  accounts: one(accounts, {
    fields: [user.id],
    references: [accounts.userId],
  }),
  twoFactorConfirmation: one(twoFactorConfirmation, {
    fields: [user.id],
    references: [twoFactorConfirmation.userId],
  }),
}));
