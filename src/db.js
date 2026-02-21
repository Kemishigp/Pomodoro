import "dotenv/config";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '../generated/prisma/client/index.js';

const connectionString = process.env.DATABASE_URL;

// 1. Create the connection pool
const pool = new pg.Pool({ connectionString });

// 2. Initialize the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the client constructor
// This satisfies the "non-empty" requirement in Prisma 7
export const prisma = new PrismaClient({ adapter });

export default prisma;