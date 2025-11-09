import * as z from "zod";

export const resetCodeSchema = z.object({
  resetCode: z.string().nonempty("Reset code is required"),
});

export type ResetCodeSchemaType = z.infer<typeof resetCodeSchema>;
