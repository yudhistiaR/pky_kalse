import { AuthService } from "../services/AuthService";
import { errorResponse } from "../error/response";
import { NextResponse } from "next/server";
import { Validation } from "@/helpers/validation/Validation";
import { AuthValidation } from "@/helpers/validation/AuthValidation";

export class AuthController {
  static async REGISTER(req) {
    try {
      const request = await req.json();
      Validation.Validate(AuthValidation.REGISTER, request);

      const response = await AuthService.REGISTER(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
