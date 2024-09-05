import { HttpStatusCode } from "axios";
import connectDB from "@/lib/connectDB";
import Editeur from "@/models/Editeur";
import { NextResponse } from "next/server";
export async function GET(_, { params }) {
  try {
    await connectDB();
    const editeur = await Editeur.findById(params.id);
    if (editeur) {
      return NextResponse.json({ editeur });
    }
    return NextResponse.json(
      { message: `Editeur ${params.id} not found` },
      {
        status: HttpStatusCode.NotFound,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const editeur = await Editeur.findById(params.id);
    if (editeur) {
      const body = await req.json();
      editeur.maisonedit = body.maisonedit;
      editeur.sitweb = body.sitweb;
      editeur.email = body.email;
      editeur.save();
      return NextResponse.json({ editeur });
    }
    return NextResponse.json(
      { message: `Editeur ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const editeur = await Editeur.findById(params.id);
    if (editeur) {
      await Editeur.findByIdAndDelete(editeur._id);
      return NextResponse.json({
        message: `Editeur ${params.id} has been 
    deleted`,
      });
    }
    return NextResponse.json(
      { message: `Editeur ${params.id} not found` },
      {
        status: HttpStatusCode.NotFound,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
