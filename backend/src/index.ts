import { Hono } from 'hono';
import { userRouter } from './route/user';  
import { postRouter } from './route/post';
import { cors } from 'hono/cors';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*',cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', postRouter)

export default app;