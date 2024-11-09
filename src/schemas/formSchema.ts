import { z } from "zod";

export const formSchema = z.object({
  place: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of travel is required.",
  }),
});
