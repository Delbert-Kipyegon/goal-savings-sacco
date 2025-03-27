import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const client = await clientPromise;
    const db = client.db("goalify");

    // Get goals statistics
    const goals = await db
      .collection("goals")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(decoded.userId),
          },
        },
        {
          $facet: {
            // Total goals count
            totalGoals: [{ $count: "count" }],

            // Completed goals count
            completedGoals: [
              { $match: { completed: true } },
              { $count: "count" },
            ],

            // Goals due this week
            upcomingGoals: [
              {
                $match: {
                  targetDate: {
                    $gte: new Date(),
                    $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  },
                  completed: false,
                },
              },
              { $count: "count" },
            ],

            // Recent goals
            recentGoals: [
              { $sort: { createdAt: -1 } },
              { $limit: 5 },
              {
                $project: {
                  title: 1,
                  completed: 1,
                  targetDate: 1,
                  createdAt: 1,
                },
              },
            ],

            // Goals by completion status
            goalsByStatus: [
              {
                $group: {
                  _id: "$completed",
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ])
      .toArray();

    // Get user info
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(decoded.userId) },
        { projection: { email: 1, name: 1, createdAt: 1 } }
      );

    // Format the response
    const dashboardData = {
      user: {
        email: user?.email,
        name: user?.name,
        memberSince: user?.createdAt,
      },
      stats: {
        totalGoals: goals[0].totalGoals[0]?.count || 0,
        completedGoals: goals[0].completedGoals[0]?.count || 0,
        upcomingGoals: goals[0].upcomingGoals[0]?.count || 0,
        completionRate: goals[0].totalGoals[0]?.count
          ? ((goals[0].completedGoals[0]?.count || 0) /
              goals[0].totalGoals[0].count) *
            100
          : 0,
      },
      recentGoals: goals[0].recentGoals,
      goalsByStatus: goals[0].goalsByStatus.reduce(
        (acc: any, curr: any) => {
          acc[curr._id ? "completed" : "inProgress"] = curr.count;
          return acc;
        },
        { completed: 0, inProgress: 0 }
      ),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
