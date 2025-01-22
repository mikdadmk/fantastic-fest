import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

// Handle PUT (update) and DELETE (remove)
export async function PUT(req, { params }) {
    const db = await connectToDatabase();
    const collection = db.collection('studentslist');
    const { id } = params;

    const body = await req.json();
    const { name, chestNumber, team, category } = body;

    if (!name || !chestNumber || !team || !category) {
        return new Response(JSON.stringify({ message: 'All fields are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, chestNumber, team, category } }
    );

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(req, { params }) {
    const db = await connectToDatabase();
    const collection = db.collection('studentslist');
    const { id } = params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
