import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

type Bindings = {
    DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.post('/api/v1/signup', async (c) => {
    const adapter = new PrismaPg({ connectionString: c.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter }).$extends(withAccelerate())
    return c.text('signup route')
})

export default app;