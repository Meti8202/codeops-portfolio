import { z } from "zod";

export const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

const phoneRegex = /^(?:\+251|0)9\d{8}$/;

export const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),

  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s/g, ""))
    .refine((v) => phoneRegex.test(v), {
      message: "Use 09… or +2519… (TeleBirr number)",
    }),

  area: z.enum(AREAS, {
    errorMap: () => ({ message: "Choose a delivery area" }),
  }),

  notes: z
    .string()
    .max(200, "Notes must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
});
