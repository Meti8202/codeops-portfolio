import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^(09|\+2519)\d{8}$/, "Phone must be 09xxxxxxxx or +2519xxxxxxxx"),
  dishId: z.string().optional(),
  quantity: z.coerce.number().min(1).optional().default(1),
  notes: z.string().max(200).optional(),
});
