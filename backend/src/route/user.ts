import { Hono } from 'hono';
import { PrismaClient } from '../generated/prisma/edge' 
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/utils/jwt/jwt';
import { signininput,signupinput } from 'week13-common'

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

export const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const body = await c.req.json();
        const { success } = signupinput.safeParse(body);
        if(!success){
            c.status(411)
            return c.json({
                msg:"Incorrect inputs"
            })
        }
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

userRouter.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const { success } = signupinput.safeParse(body);
        if(!success){
            c.status(411)
            return c.json({
                msg:"Incorrect inputs"
            })
        }
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