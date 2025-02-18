import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function GoalsPage() {
	const goals = [
		{
			id: 1,
			name: "Emergency Fund",
			target: 5000,
			current: 2450,
			deadline: "2024-12-31",
			progress: 49,
		},
		{
			id: 2,
			name: "House Down Payment",
			target: 20000,
			current: 5000,
			deadline: "2025-06-30",
			progress: 25,
		},
		// Add more goals as needed
	];

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">My Savings Goals</h2>
				<Button asChild>
					<Link href="/dashboard/goals/new">Create New Goal</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{goals.map((goal) => (
					<Card key={goal.id}>
						<CardHeader>
							<CardTitle>{goal.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span>Progress</span>
									<span className="font-medium">{goal.progress}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2.5">
									<div
										className="bg-blue-600 h-2.5 rounded-full"
										style={{ width: `${goal.progress}%` }}
									></div>
								</div>
								<div className="flex justify-between text-sm">
									<span>Kshs {goal.current.toLocaleString()}</span>
									<span>Kshs {goal.target.toLocaleString()}</span>
								</div>
								<div className="text-sm text-gray-500">
									Deadline: {new Date(goal.deadline).toLocaleDateString()}
								</div>
								<div className="flex space-x-2">
									<Button
										size="sm"
										variant="outline"
										className="w-full"
									>
										Edit
									</Button>
									<Button
										size="sm"
										className="w-full"
									>
										Add Deposit
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
