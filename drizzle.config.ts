
// import type { Config } from 'drizzle-kit';

// export default {
//   schema: './src/drizzle/schemas/schema.ts',
//   out: './src/drizzle/out',
//   driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
//   dbCredentials: {
//     host: process.env.DB_HOST!,
//     user: process.env.DB_USER!,
//     password: process.env.DB_PASSWORD!,
//     database: process.env.DB_NAME!,
//   },
// } satisfies Config;

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schemas/schema.ts',
  out: './src/drizzle/out',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString:process.env.DATABASE_URL!
  },
  
} satisfies Config;


