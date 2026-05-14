import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/utils/jwt/jwt';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/v1/blog/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1]
    try {
        const response = await verify(token, c.env.JWT_SECRET, "HS256");
        if (response.id) {
            return await next();
        }
    } catch(e) {
        // verify throws if token is invalid
    }
    c.status(403);
    return c.json({ error: "unauthorised" })
})

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

app.post('/api/v1/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        })

        if (!user || user.password !== body.password) {
            return c.json({ error: "Invalid credentials" }, 403)
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token })
    } catch(e) {
        return c.json({ error: String(e) }, 500)
    }
})

export default app;