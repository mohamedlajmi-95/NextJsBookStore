import { HttpStatusCode } from "axios";
import connectDB from "@/lib/connectDB";
import Livre from "@/models/Livre";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    if (body.titre) {
      const livre = await Livre.create(body);
      return NextResponse.json(
        { livre, message: "Your book has been created" },
        { status: HttpStatusCode.Created }
      );
    }
    return NextResponse.json(
      { message: "Title is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
export async function GET() {
  try {
    await connectDB();
    const livres = await Livre.find({}, null, { sort: { _id: -1 } })
      .populate("auteurs")
      .populate("specialite")
      .populate("maised");
    return NextResponse.json(livres);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
