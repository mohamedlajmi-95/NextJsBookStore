import { HttpStatusCode } from "axios";
import connectDB from "@/lib/connectDB";
import Auteur from "@/models/Auteur";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const auteur = await Auteur.create(body);
    return NextResponse.json(
      { auteur, message: "Your author has been created" },
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
    const auteurs = await Auteur.find();
    return NextResponse.json({ auteurs });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
