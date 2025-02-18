"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Download } from "lucide-react";

export default function TransactionsPage() {
	const [filter, setFilter] = useState("all");

	const transactions = [
		{
			id: 1,
			type: "deposit",
			amount: 100,
			goal: "Emergency Fund",
			date: "2024-03-15",
			status: "completed",
		},
		{
			id: 2,
			type: "withdrawal",
			amount: 50,
			goal: "Vacation Fund",
			date: "2024-03-14",
			status: "completed",
		},
		// Add more transactions as needed
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row justify-between gap-4">
				<h2 className="text-2xl font-bold">Transactions</h2>
				<div className="flex flex-col sm:flex-row gap-2">
					<Select
						value={filter}
						onValueChange={setFilter}
					>
						<SelectTrigger className="w-full sm:w-[180px]">
							<SelectValue placeholder="Filter by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Transactions</SelectItem>
							<SelectItem value="deposits">Deposits</SelectItem>
							<SelectItem value="withdrawals">Withdrawals</SelectItem>
						</SelectContent>
					</Select>
					<Button
						variant="outline"
						className="flex items-center gap-2"
					>
						<Download className="h-4 w-4" /> Export
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Transaction History</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{transactions.map((transaction) => (
							<div
								key={transaction.id}
								className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-2"
							>
								<div className="flex items-center space-x-4">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center ${
											transaction.type === "deposit"
												? "bg-green-100"
												: "bg-red-100"
										}`}
									>
										<span
											className={`${
												transaction.type === "deposit"
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{transaction.type === "deposit" ? "+" : "-"}
										</span>
									</div>
									<div>
										<p className="font-medium">{transaction.goal}</p>
										<p className="text-sm text-gray-500">
											{new Date(transaction.date).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className="flex items-center justify-between sm:justify-end gap-4">
									<span
										className={`font-medium ${
											transaction.type === "deposit"
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{transaction.type === "deposit" ? "+" : "-"}Kshs
										{transaction.amount}
									</span>
									<span className="text-sm px-2 py-1 bg-gray-200 rounded">
										{transaction.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
