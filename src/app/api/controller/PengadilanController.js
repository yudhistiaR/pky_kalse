import { errorResponse } from "../error/response";
import { ErrorResponse } from "../error/errorResponse";
import { NextResponse } from "next/server";
import { PengadilanService } from "../services/PengadilanService";
import { Validation } from "@/helpers/validation/Validation";
import { PengadilanValidation } from "@/helpers/validation/PengadilanValidation";

export class PengadilanController {
  static async CREATE(req) {
    try {
      const request = await req.json();
      Validation.Validate(PengadilanValidation.CREATE, request);

      const response = await PengadilanService.CREATE(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async GETALL() {
    try {
      const response = await PengadilanService.GETALL();

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async GETBYID(id) {
    try {
      Validation.Validate(PengadilanValidation.ID, { id: id });
      const response = await PengadilanService.GETBYID(id);

      if (response.length <= 0) {
        throw new ErrorResponse(404, "ID Tidak Ditemukan");
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async UPDATE(id, req) {
    try {
      Validation.Validate(PengadilanValidation.ID, { id: id });

      const findID = await this.GETBYID(id);

      if (findID.status === 404) {
        throw new ErrorResponse(404, "ID Tidak Ditemukan");
      }

      Validation.Validate(PengadilanValidation.ID, { id: id });

      const request = await req.json();
      const response = await PengadilanService.UPDATE(id, request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async DELETE(req) {
    try {
      const request = await req.json();

      Validation.Validate(PengadilanValidation.ID, request);

      const findID = await this.GETBYID(request.id);

      if (findID.status === 404) {
        throw new ErrorResponse(404, "ID Tidak Ditemukan");
      }

      await PengadilanService.DELETE(request);

      return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
