import connectDB from "@/lib/connectDB";
import { HttpStatusCode } from "axios";
import Specialite from "@/models/Specialite";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    const specialites = await Specialite.find({}, null, { sort: { _id: -1 } });
    return NextResponse.json(specialites);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    if (body.nomspecialite) {
      const specialite = await Specialite.create(body);
      return NextResponse.json(
        { specialite, message: "Your specialite has been created" },
        { status: HttpStatusCode.Created }
      );
    }
    return NextResponse.json(
      { message: "nomspecialite is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
