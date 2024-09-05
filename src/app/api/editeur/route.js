import { HttpStatusCode } from "axios";
import connectDB from "@/lib/connectDB";
import Editeur from "@/models/Editeur";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const editeur = await Editeur.create(body);
    return NextResponse.json(
      { editeur, message: "Your editeur has been created" },
      { status: HttpStatusCode.Created }
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
    const editeurs = await Editeur.find();
    return NextResponse.json({ editeurs });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
