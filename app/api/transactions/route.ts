import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const client = await clientPromise;
    const db = client.db("goalify");

    const transactions = await db
      .collection("transactions")
      .find({ userId: new ObjectId(decoded.userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const body = await request.json();
    const { type, amount, description, goalId } = body;

    const client = await clientPromise;
    const db = client.db("goalify");

    const transaction = {
      userId: new ObjectId(decoded.userId),
      type,
      amount,
      description,
      goalId: goalId ? new ObjectId(goalId) : null,
      createdAt: new Date(),
    };

    await db.collection("transactions").insertOne(transaction);

    // Update goal progress if this transaction is associated with a goal
    if (goalId) {
      await db
        .collection("goals")
        .updateOne(
          { _id: new ObjectId(goalId) },
          { $inc: { currentAmount: amount } }
        );
    }

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
