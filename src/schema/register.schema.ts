import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be at most 25 characters"),
    email: z.email().nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should be Minimum Six characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: z.string().nonempty("Confirm Password is required"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^(02)?01[0125][0-9]{8}$/),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Password & Confirm Password not match",
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
