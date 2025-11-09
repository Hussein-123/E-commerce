import * as z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email().nonempty("Email is required"),
});

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
