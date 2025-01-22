import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Handle GET requests
export async function GET() {
  const db = await connectToDatabase();
  try {
    const schedules = await db.collection("schedules").find({}).toArray();
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching schedules", error }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req) {
  const db = await connectToDatabase();
  const body = await req.json();

  const { programmeName, time, date, stage } = body;

  if (!programmeName || !time || !date || !stage) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const result = await db.collection("schedules").insertOne({
      programmeName,
      time,
      date,
      stage,
      createdAt: new Date(),
    });
    return NextResponse.json(
      { message: "Schedule added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error adding schedule", error }, { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(req) {
  const db = await connectToDatabase();
  const body = await req.json();

  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await db.collection("schedules").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Schedule deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting schedule", error }, { status: 500 });
  }
}
