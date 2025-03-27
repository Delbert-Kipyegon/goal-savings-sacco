import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { title, description, targetDate } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("goalify");

    const goal = {
      userId: new ObjectId(decoded.userId),
      title,
      description,
      targetDate: targetDate ? new Date(targetDate) : null,
      completed: false,
      createdAt: new Date(),
    };

    const result = await db.collection("goals").insertOne(goal);

    return NextResponse.json({
      success: true,
      goal: { ...goal, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Goal creation error:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}

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

    const goals = await db
      .collection("goals")
      .find({ userId: new ObjectId(decoded.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ goals });
  } catch (error) {
    console.error("Goal fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await request.json();
    const { goalId, completed } = body;

    if (!goalId) {
      return NextResponse.json(
        { error: "Goal ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("goalify");

    const result = await db.collection("goals").updateOne(
      {
        _id: new ObjectId(goalId),
        userId: new ObjectId(decoded.userId),
      },
      {
        $set: {
          completed,
          completedAt: completed ? new Date() : null,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Goal update error:", error);
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 }
    );
  }
}
