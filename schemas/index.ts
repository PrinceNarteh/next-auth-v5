import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, { message: "Password is required." }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().trim().min(6, { message: "Password is required." }),
    email: z.string().trim().email(),
    password: z
      .string()
      .min(6, { message: "Password should be six (6) characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
