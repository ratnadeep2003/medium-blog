import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/utils/jwt/jwt';
import { createPostInput, updatePostInput } from 'week13-common';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}
type Variables = {
        userId: string
}
export const postRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

postRouter.use('/*', async (c, next)=>{
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET, "HS256")
    if(user){
        c.set("userId", user.id as string);
        await next();
    }else{
        c.status(403)
        return c.json({
            msg:"you are not logged in"
        })
    }
})

postRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body)
    if(!success){
            c.status(411)
            return c.json({
                msg:"Incorrect inputs"
            })
        }
    const authorId = c.get("userId");
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: (authorId)
        }
    })
    return c.json({
        id: post.id
    })
})

postRouter.put('/', async (c)=>{
    const body = await c.req.json()
    const { success } = createPostInput.safeParse(body)
    if(!success){
            c.status(411)
            return c.json({
                msg:"Incorrect inputs"
            })
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where:{
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: post.id
    })
})

postRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())  
    const posts = await prisma.post.findMany()

    return c.json({posts})
})

postRouter.get('/:id', async (c)=>{
    const id =  c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.findFirst({
        where:{
            id: id
        }
    })
    return c.json({
        post
    })
})

