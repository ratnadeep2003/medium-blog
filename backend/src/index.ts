import { Hono } from 'hono';
import { userRouter } from './route/user';
import { postRouter } from './route/post';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

const app = new Hono<{ Bindings: Bindings }>();

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', postRouter)

export default app;