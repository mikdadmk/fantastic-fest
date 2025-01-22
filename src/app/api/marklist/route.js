// app/api/programmes/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const marklist = await db
      .collection("marklist")
      .find(
        {},
        {
          projection: {
            _id: 1,
            programme: 1,
            chestNumber: 1,
            position: 1,
            mark: 1,
            name: 1,
            category: 1,
            team: 1,
            type: 1, // Include 'type' field in the projection
            item: 1, // Include 'item' field in the projection
          },
        }
      )
      .toArray();

    return new Response(JSON.stringify(marklist), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch marklist." }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    // Handle general entries (type === "general")
    if (body.type === "general") {
      if (!body.team || !["dhamak", "chalak", "chamak"].includes(body.team)) {
        return new Response(
          JSON.stringify({ error: "Invalid team for general entry." }),
          { status: 400 }
        );
      }
      body.name = "General"; // Set default name for general entries
      body.chestNumber = "N/A"; // General entries have no chest number
      body.category = "General"; // Set default category for general entries
    }

    // Handle individual entries with a valid chest number
    if (body.type === "individual") {
      const student = await db
        .collection("studentslist")
        .findOne({ chestNumber: body.chestNumber });

      if (student) {
        body.name = student.name;
        body.category = student.category;
        body.team = student.team;
      } else {
        return new Response(
          JSON.stringify({ error: "Chest number not found." }),
          { status: 404 }
        );
      }
    }

    // Store full data to marklist collection, including 'type' and 'item'
    const result = await db.collection("marklist").insertOne({
      programme: body.programme,
      chestNumber: body.chestNumber || "", // Optional for general entries
      position: body.position,
      mark: body.mark,
      name: body.name,
      category: body.category,
      team: body.team || "", // Optional for individual entries
      type: body.type,
      item: body.item,
    });

    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add mark." }),
      { status: 500 }
    );
  }
}



export async function PUT(req) {
  try {
    const { _id, update } = await req.json();
    const db = await connectToDatabase();

    // Ensure 'type' and 'item' are included in the update object
    const result = await db.collection("marklist").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...update,
          type: update.type || "", // Default to an empty string if not provided
          item: update.item || "", // Default to an empty string if not provided
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Mark not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to edit mark." }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { _id } = await req.json();
    const db = await connectToDatabase();
    const result = await db
      .collection("marklist")
      .deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Mark not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete mark." }),
      { status: 500 }
    );
  }
}
