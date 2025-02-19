import { NextResponse } from "next/server";
import { errorResponse } from "../error/response";

//service
import { UserService } from "../services/UserService";

export class UserController {
  static async GETUSERS(query) {
    try {
      const response = await UserService.GETUSERS(query);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async GETUSER(id) {
    try {
      const response = await UserService.GETUSER(id);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async UPDATE(id, req) {
    try {
      const request = await req.json();
      const response = await UserService.UPDATE(id, request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
