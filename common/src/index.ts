import z from "zod"

export const signupinput = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signininput = z.object({
    username: z.email(),
    password: z.string().min(6),
})

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
})

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
})

export type SignupInput = z.infer<typeof signupinput>
export type SigninInput = z.infer<typeof signininput>
export type CreatePostInput = z.infer<typeof createPostInput>
export type UpdatePostInput = z.infer<typeof updatePostInput>