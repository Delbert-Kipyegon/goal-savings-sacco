import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const { token, password } = await req.json();

		const client = await clientPromise;
		const db = client.db("goalify");

		// Find user with valid reset token
		const user = await db.collection("users").findOne({
			resetToken: token,
			resetTokenExpiry: { $gt: new Date() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid or expired reset token" },
				{ status: 400 }
			);
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Update user password and remove reset token
		await db.collection("users").updateOne(
			{ _id: user._id },
			{
				$set: { password: hashedPassword },
				$unset: { resetToken: "", resetTokenExpiry: "" },
			}
		);

		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Reset password error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
