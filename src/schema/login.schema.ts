import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should be Minimum Six characters, at least one upper case English letter, one lower case English letter, one number and one special character"
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
