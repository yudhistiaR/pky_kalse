import { z } from "zod";

export class HakimValidation {
  static CREATE = z.object({
    nama: z.string().min(1),
    jabatan: z.string().min(1),
    golongan: z.string().min(1),
    riwayat_pekerjaan: z.string().min(1),
    namaPengadilanId: z.string().uuid(),
  });

  static UPDATE = z.object({
    nama: z.string().min(1),
    jabatan: z.string().min(1),
    golongan: z.string().min(1),
    riwayat_pekerjaan: z.string().min(1),
  });
}
