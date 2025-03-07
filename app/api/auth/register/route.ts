import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
	try {	
		const { email, password, name } = await req.json();

		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("goalify");

		// Check if user already exists
		const existingUser = await db.collection("users").findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await db.collection("users").insertOne({
			email,
			password: hashedPassword,
			name,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
