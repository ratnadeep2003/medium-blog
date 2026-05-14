# Medium Clone

Full-stack blogging platform inspired by Medium.

## Stack
- **Frontend**: React
- **Backend**: Cloudflare Workers (Hono)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma with Accelerate (connection pooling)
- **Auth**: JWT
- **Validation**: Zod
- **Language**: TypeScript

## Backend Setup

1. Install dependencies
```bash

   cd backend
   npm install
```

2. Set up `.env`
```
DATABASE_URL="your-neon-postgres-url"
```
3. Set Accelerate URL in `wrangler.jsonc`
```jsonc
   "vars": {
     "DATABASE_URL": "prisma+postgres://accelerate.prisma-data.net/?api_key=..."
   }
```

4. Run migrations
```bash
   npx prisma migrate dev --name init_schema
```

5. Generate Prisma client
```bash
   npx prisma generate --no-engine
```

6. Run locally
```bash
   npm run dev
```

## Key Notes
- Prisma 7 new `prisma-client` generator requires `@prisma/adapter-pg` 
- CF Workers uses `c.env.DATABASE_URL` not `process.env`
- Generated client is in `src/generated/prisma` (gitignored, always regenerate after clone)