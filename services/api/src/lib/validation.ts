import { z } from "zod";

export const contactPhoneSchema = z
  .string()
  .trim()
  .min(7)
  .max(25)
  .regex(/^\+?[0-9().\s-]+$/)
  .refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    },
    { message: "Enter a valid contact number." },
  );
