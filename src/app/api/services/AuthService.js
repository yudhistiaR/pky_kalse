import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

export class AuthService {
  static async REGISTER(req) {
    const SALT = 10;
    const hashPassword = bcrypt.hashSync(req.password, SALT);

    const createUser = await prisma.user.create({
      data: {
        ...req,
        password: hashPassword,
      },
    });

    return createUser;
  }
}
