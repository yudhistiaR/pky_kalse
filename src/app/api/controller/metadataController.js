import { NextResponse } from "next/server";
import { errorResponse } from "../error/response";
import { MetaDataServices } from "../services/metadataServices";

export class MetaDataContollers {
  static async HAKIM() {
    try {
      const response = await MetaDataServices.HAKIM();

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async FILTERHAKIMDATA(req) {
    try {
      const response = await MetaDataServices.FILTERHAKIMDATA(req);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async CREATEMANY(req) {
    try {
      const request = await req.json();
      const response = await MetaDataServices.CREATEMANY(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }

  static async DELETEMANY(req) {
    try {
      const request = await req.json();
      const response = await MetaDataServices.DELETEMANY(request);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return errorResponse(error);
    }
  }
}
