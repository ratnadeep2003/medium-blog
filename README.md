# Medium Clone

Full-stack blogging platform inspired by Medium.

## Stack
- **Frontend**: React
- **Backend**: Cloudflare Workers (Hono)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 5 with Accelerate (connection pooling)
- **Auth**: JWT
- **Validation**: Zod (upcoming)
- **Language**: TypeScript

## Routes
- `POST /api/v1/signup` - Register user, returns JWT
- `POST /api/v1/signin` - Login, returns JWT
- `POST /api/v1/blog/*` - Protected routes (JWT required in Authorization header)

## Backend Setup

1. Install dependencies
```bash
cd backend
npm install
```

2. Set up `.env`
```
DIRECT_URL="postgresql://your-neon-url"
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=..."
JWT_SECRET="your-secret"
```

3. Set Accelerate URL in `wrangler.jsonc`
```jsonc
"vars": {
  "DATABASE_URL": "prisma://accelerate.prisma-data.net/?api_key=...",
  "JWT_SECRET": "your-secret"
}
```

4. Run migrations
```bash
npx prisma migrate dev --name init_schema
```

5. Generate Prisma client
```bash
npx prisma generate
```

6. Run locally
```bash
npm run dev
```

## Key Notes
- **Use Prisma 5, not Prisma 7** — Prisma 7 is incompatible with CF Workers
```bash
  npm install prisma@5 @prisma/client@5 @prisma/extension-accelerate@1.1.0
```
- Import from edge path for CF Workers: `import { PrismaClient } from './generated/prisma/edge'`
- `datasourceUrl` in PrismaClient constructor only works with the edge import
- CF Workers uses `c.env.DATABASE_URL` not `process.env`
- `DATABASE_URL` = Accelerate URL, `DIRECT_URL` = raw Neon URL (for migrations only)
- Generated client is in `src/generated/prisma` (gitignored, always run `npx prisma generate` after clone)
- VS Code Prisma extension must be downgraded to `5.x` to avoid false schema warnings
- `compatibility_flags: ["nodejs_compat"]` required in `wrangler.jsonc`
- JWT `verify()` requires 3 args: `verify(token, secret, "HS256")`