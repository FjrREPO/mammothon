import { z } from "zod";

export const createPoolFormSchema = z.object({
  quoteCurrency: z.string().min(1, "This field is required"),
  tokenName: z.string().min(1, "This field is required"),
  tokenSymbol: z.string().min(1, "This field is required"),
  tokenTotalSupply: z.number().min(1, "This field is required"),
  bottomAmount: z.number().min(0, "This field is required"),
  anchorAmount: z.number().min(0, "This field is required"),
  discoveryAmount: z.number().min(0, "This field is required"),
  allocationAmount: z.number().min(0, "This field is required"),
  bottomPrice: z.number().min(1, "This field is required"),
  anchorPrice: z.number().min(1, "This field is required"),
  discoveryPrice: z.number().min(1, "This field is required"),
});

export type CreatePoolForm = z.infer<typeof createPoolFormSchema>;