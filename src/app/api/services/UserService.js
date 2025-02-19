import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

export class UserService {
  static async GETUSERS(query) {
    if (!query) return await prisma.user.findMany();

    return await prisma.user.findMany({
      where: {
        OR: [{ username: query }, { email: query }, { jabatan: query }],
      },
    });
  }

  static async GETUSER(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async UPDATE(id, data) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
