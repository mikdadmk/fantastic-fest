// app/api/route.js
import { connectToDatabase } from "@/lib/mongodb";

// Handle GET (fetch all) and POST (create new)
export async function GET(req) {
    const db = await connectToDatabase();
    const collection = db.collection('studentslist');

    const students = await collection.find({}).toArray();
    return new Response(JSON.stringify(students), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req) {
    const db = await connectToDatabase();
    const collection = db.collection('studentslist');

    const body = await req.json();
    const { name, chestNumber, team, category } = body;

    if (!name || !chestNumber || !team || !category) {
        return new Response(JSON.stringify({ message: 'All fields are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const result = await collection.insertOne({ name, chestNumber, team, category });
    return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
