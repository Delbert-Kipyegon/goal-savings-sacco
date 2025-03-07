import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
	const handleLogin = async (email: string, password: string) => {
		// Handle login logic here
		console.log(email, password);

		// Make API call to authenticate user
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data = await response.json();

			// You may want to store the token/session data here
			// For example:
			// localStorage.setItem("token", data.token);
		} catch (error) {
			console.error("Login error:", error);
			// Handle error appropriately - maybe show error message to user
			return;
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Suspense fallback={<div>Loading...</div>}>
				<LoginForm onSubmit={handleLogin} />
			</Suspense>
		</div>
	);
}
