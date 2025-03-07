import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const client = await clientPromise;
		const db = client.db("goalify");

		// Generate reset token
		const resetToken = crypto.randomBytes(32).toString("hex");
		const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

		// Update user with reset token
		const result = await db.collection("users").updateOne(
			{ email },
			{
				$set: {
					resetToken,
					resetTokenExpiry,
				},
			}
		);

		if (result.matchedCount === 0) {
			return NextResponse.json(
				{ error: "No account found with this email" },
				{ status: 404 }
			);
		}

		// Send reset email
		await sendPasswordResetEmail(email, resetToken);

		return NextResponse.json(
			{ message: "Password reset email sent" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Forgot password error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
