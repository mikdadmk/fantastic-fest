import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { username, email, message } = await req.json();

    // Validate the input fields
    if (!username || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectToDatabase();

    // Insert the data into the "messages" collection
    const result = await db.collection("messages").insertOne({
      username,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: "Your message has been received!", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling contact form submission:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
