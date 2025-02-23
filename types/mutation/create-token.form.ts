import { z } from "zod";

export const createTokenFormSchema = z.object({
  name: z.string().min(1, "This field is required"),
  symbol: z.string().min(1, "This field is required"),
  totalSupply: z.number().min(1, "This field is required"),
});

export type CreateTokenForm = z.infer<typeof createTokenFormSchema>;