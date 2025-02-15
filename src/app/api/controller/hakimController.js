import { NextResponse } from "next/server";
import { HakimServices } from "../services/hakimService";
import { errorResponse } from "../error/response";
import { Validation } from "@/helpers/validation/Validation";
import { ValidationID } from "@/helpers/validation/ValidationID";
import { HakimValidation } from "@/helpers/validation/hakimValidation";

export class HakimController {
  static async GETHAKIM(req) {
    try {
      const response = await HakimServices.GETHAKIM();

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async GETID(id) {
    console.log(id);
    try {
      Validation.Validate(ValidationID, { id: id });
      const response = await HakimServices.GETID(id);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async FILTERHAKIMDATA(req) {
    try {
      const response = await HakimServices.FILTERHAKIMDATA(req);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async CREATE(req) {
    try {
      const request = await req.json();
      const response = await HakimServices.CREATE(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async UPDATE(id, req) {
    try {
      const request = await req.json();

      Validation.Validate(ValidationID, { id: id });
      Validation.Validate(HakimValidation.UPDATE, request);

      const response = await HakimServices.UPDATE(id, request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async DELETE(id) {
    try {
      Validation.Validate(ValidationID, { id: id });

      HakimServices.DELETE(id);

      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async DELETEMANY(req) {
    try {
      const request = await req.json();
      const response = await HakimServices.DELETEMANY(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
