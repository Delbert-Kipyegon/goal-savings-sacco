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

    const savings = await db
      .collection("savings")
      .findOne({ userId: new ObjectId(decoded.userId) });

    return NextResponse.json(savings || { balance: 0 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch savings" },
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
    const { amount, type } = body; // type can be 'deposit' or 'withdrawal'

    const client = await clientPromise;
    const db = client.db("goalify");

    // Update savings balance
    await db.collection("savings").updateOne(
      { userId: new ObjectId(decoded.userId) },
      {
        $inc: { balance: type === "deposit" ? amount : -amount },
        $setOnInsert: { userId: new ObjectId(decoded.userId) },
      },
      { upsert: true }
    );

    // Record transaction
    const transaction = {
      userId: new ObjectId(decoded.userId),
      type,
      amount,
      description: `${
        type === "deposit" ? "Deposit to" : "Withdrawal from"
      } savings`,
      createdAt: new Date(),
    };

    await db.collection("transactions").insertOne(transaction);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process savings transaction" },
      { status: 500 }
    );
  }
}
