import { z } from "zod";

export class PengadilanValidation {
  static ID = z.object({
    id: z.string().uuid(),
  });

  static CREATE = z.object({
    nama: z.string().min(1),
    alamat: z.string().min(1),
  });
}
