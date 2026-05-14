import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/utils/jwt/jwt';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

const app = new Hono<{ Bindings: Bindings }>();

app.post('/api/v1/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const body = await c.req.json();
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            },
        })
        
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token })
    } catch(e) {
        return c.json({ error: String(e) }, 500)
    }
})

export default app;