import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("Details are required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^(02)?01[0125][0-9]{8}$/),
  city: z.string().nonempty("City is required"),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
