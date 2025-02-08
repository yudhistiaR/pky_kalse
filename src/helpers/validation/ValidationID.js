import { z } from "zod";

export const ValidationID = z.object({
  id: z.string().uuid(),
});
