import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const params = new URL(req.url).searchParams;
    const filter = params.get("filter");

    const marklistQuery = db.collection("marklist").find();

    // Apply filters
    if (filter) {
      if (filter === "general") {
        // Filter for general teams only
        marklistQuery.filter({ type: "general" });
      } else {
        // Filter for specific team or category
        marklistQuery.filter({ $or: [{ team: filter }, { category: filter }] });
      }
    }

    const marklist = await marklistQuery.toArray();
    const studentslist = await db.collection("studentslist").find({}).toArray();

    const totalMarks = marklist.reduce((acc, item) => {
      const mark = Number(item.mark);
      if (filter === "general") {
        // Calculate marks grouped by team for general type
        acc[item.team] = (acc[item.team] || 0) + mark;
      } else {
        acc[item.chestNumber] = (acc[item.chestNumber] || 0) + mark;
      }
      return acc;
    }, {});

    if (filter === "general") {
      // Return top teams based on general type marks
      const topTeams = Object.entries(totalMarks)
        .map(([team, totalMark]) => ({ team, totalMark }))
        .sort((a, b) => b.totalMark - a.totalMark);

      return new Response(JSON.stringify(topTeams), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Return individual performers
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
