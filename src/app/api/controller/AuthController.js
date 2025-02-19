import { AuthService } from "../services/AuthService";
import { errorResponse } from "../error/response";
import { NextResponse } from "next/server";
import { Validation } from "@/helpers/validation/Validation";
import { AuthValidation } from "@/helpers/validation/AuthValidation";
import { ValidationID } from "@/helpers/validation/ValidationID";

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

  static async CHANGEPASSWORD(id, req) {
    try {
      const request = await req.json();
      Validation.Validate(ValidationID, { id: id });
      Validation.Validate(AuthValidation.CHANGEPASSWORD, request);

      const response = await AuthService.CHANGEPASSWORD(id, request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
