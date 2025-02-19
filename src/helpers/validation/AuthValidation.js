import { z } from "zod";

export class AuthValidation {
  static LOGIN = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1),
    password: z.string().min(1),
  });

  static REGISTER = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1),
    username: z.string().min(1),
    telpon: z.string().min(1).max(13),
    jabatan: z.string().min(1),
    password: z.string().min(1),
  });

  static CHANGEPASSWORD = z.object({
    old_password: z.string().min(1),
    new_password: z.string().min(1),
  });
}
