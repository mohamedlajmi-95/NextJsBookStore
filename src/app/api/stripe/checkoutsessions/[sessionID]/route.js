import { NextResponse } from "next/server";
import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable."
  );
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//Récupérer le nom et l’email saisis dans la transaction stripe
export async function GET(_, { params }) {
  try {
    const sessionID = params.sessionID;
    const session = await stripe.checkout.sessions.retrieve(sessionID);
    const nomClient = session.customer_details.name;
    const emailClient = session.customer_details.email;
    return NextResponse.json({ nomClient, emailClient });
  } catch (error) {
    console.log(err);
    return NextResponse.json({ error: "Error with session" });
  }
}
