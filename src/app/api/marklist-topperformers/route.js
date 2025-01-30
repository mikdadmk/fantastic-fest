import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const params = new URL(req.url).searchParams;
    const filter = params.get("filter");
    const chestNumber = params.get("chestNumber");

    if (chestNumber) {
      // Fetch specific performer's results
      const performerResults = await db
        .collection("marklist")
        .find({ chestNumber })
        .toArray();
      return new Response(JSON.stringify(performerResults), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const marklistQuery = db.collection("marklist").find();

    // Apply filters
    if (filter) {
      if (filter === "general") {
        marklistQuery.filter({ type: "general" });
      } else {
        marklistQuery.filter({ $or: [{ team: filter }, { category: filter }] });
      }
    }

    const marklist = await marklistQuery.toArray();
    const studentslist = await db.collection("studentslist").find({}).toArray();

    const totalMarks = marklist.reduce((acc, item) => {
      const mark = Number(item.mark);
      if (filter === "general") {
        acc[item.team] = (acc[item.team] || 0) + mark;
      } else {
        acc[item.chestNumber] = (acc[item.chestNumber] || 0) + mark;
      }
      return acc;
    }, {});

    if (filter === "general") {
      const topTeams = Object.entries(totalMarks)
        .map(([team, totalMark]) => ({ team, totalMark }))
        .sort((a, b) => b.totalMark - a.totalMark);

      return new Response(JSON.stringify(topTeams), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const performersList = Object.entries(totalMarks)
        .map(([chestNumber, totalMark]) => {
          const student = studentslist.find((s) => s.chestNumber === chestNumber);
          return student
            ? {
                chestNumber,
                name: student.name,
                totalMark,
                image: student.image || "/default-avatar.png",
                team: student.team || marklist.find((m) => m.chestNumber === chestNumber)?.team,
              }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.totalMark - a.totalMark);

      return new Response(JSON.stringify(performersList), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error fetching performers:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
