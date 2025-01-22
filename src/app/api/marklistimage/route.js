import { connectToDatabase } from "@/lib/mongodb";

// Handle GET request (fetch all marklist items)
export async function GET() {
  try {
    const db = await connectToDatabase();
    const marklist = await db.collection("studentslist").find().toArray();

    if (!marklist) {
      return new Response(JSON.stringify({ error: "No data found" }), { status: 404 });
    }

    return new Response(JSON.stringify(marklist), { status: 200 });
  } catch (error) {
    console.error("Error fetching marklist:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
