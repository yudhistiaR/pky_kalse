import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { UserService } from "./UserService";
import { ErrorResponse } from "../error/errorResponse";

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

  static async CHANGEPASSWORD(id, data) {
    const SALT = 10;

    const isUser = await UserService.GETUSER(id);

    if (!isUser) throw new ErrorResponse(404, "user not found");

    const isMatchPassword = bcrypt.compareSync(
      data.old_password,
      isUser.password,
    );

    if (!isMatchPassword) throw new ErrorResponse(400, "Password not match");

    const hashPassword = bcrypt.hashSync(data.new_password, SALT);

    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
      },
    });
  }
}
