import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Handle GET request (fetch marklist item by ID)
export async function GET(req, { params }) {
  const { id } = params; // Get `id` from URL params

  try {
    const db = await connectToDatabase();
    const studentslist = await db
      .collection("studentslist")
      .findOne({ _id: new ObjectId(id) });

    if (!studentslist) {
      return new Response(JSON.stringify({ error: "studentslist item not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(studentslist), { status: 200 });
  } catch (error) {
    console.error("Error fetching studentslist by ID:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// Handle POST request (update image link for marklist item by ID)
export async function POST(req, { params }) {
  const { id } = params;  // Get `id` from URL params
  const { image } = await req.json();  // Get `image` link from the request body

  if (!image) {
    return new Response(JSON.stringify({ error: "Image link is required" }), { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const result = await db
      .collection("studentslist")
      .updateOne({ _id: new ObjectId(id) }, { $set: { image } });

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "studentslist item not found or image not updated" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Image updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating image:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
