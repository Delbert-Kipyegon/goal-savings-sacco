"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Predefined goals with their constraints
const SAVING_GOALS = [
	{
		id: "emergency_fund",
		name: "Emergency Fund",
		description: "Save for unexpected expenses and emergencies",
		minAmount: 500,
		maxAmount: 10000,
		minDuration: 3, // months
		maxDuration: 24, // months
		interestRate: 3.5,
	},
	{
		id: "house_deposit",
		name: "House Deposit",
		description: "Save for a house down payment",
		minAmount: 5000,
		maxAmount: 100000,
		minDuration: 12,
		maxDuration: 60,
		interestRate: 4.0,
	},
	{
		id: "education",
		name: "Education Fund",
		description: "Save for education or professional development",
		minAmount: 1000,
		maxAmount: 50000,
		minDuration: 6,
		maxDuration: 36,
		interestRate: 3.8,
	},
	{
		id: "business",
		name: "Business Investment",
		description: "Save to start or expand your business",
		minAmount: 2000,
		maxAmount: 75000,
		minDuration: 12,
		maxDuration: 48,
		interestRate: 4.2,
	},
	{
		id: "vehicle",
		name: "Vehicle Purchase",
		description: "Save for a vehicle purchase",
		minAmount: 3000,
		maxAmount: 40000,
		minDuration: 6,
		maxDuration: 36,
		interestRate: 3.5,
	},
];

const formSchema = z.object({
	goalType: z.string({
		required_error: "Please select a savings goal type",
	}),
	targetAmount: z
		.number({
			required_error: "Please enter a target amount",
			invalid_type_error: "Amount must be a number",
		})
		.min(0),
	duration: z
		.number({
			required_error: "Please enter the duration",
			invalid_type_error: "Duration must be a number",
		})
		.min(0),
	monthlyContribution: z
		.number({
			required_error: "Please enter your monthly contribution",
			invalid_type_error: "Amount must be a number",
		})
		.min(0),
	notes: z.string().optional(),
});

export default function NewGoalPage() {
	const [selectedGoal, setSelectedGoal] = useState(SAVING_GOALS[0]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			goalType: "",
			targetAmount: 0,
			duration: 12,
			monthlyContribution: 0,
			notes: "",
		},
	});

	const handleGoalTypeChange = (goalId: string) => {
		const goal = SAVING_GOALS.find((g) => g.id === goalId);
		if (goal) {
			setSelectedGoal(goal);
			form.setValue("targetAmount", goal.minAmount);
			form.setValue("duration", goal.minDuration);
			form.setValue(
				"monthlyContribution",
				Math.ceil(goal.minAmount / goal.minDuration)
			);
		}
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		// Add your submission logic here
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					asChild
				>
					<Link href="/dashboard/goals">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<h2 className="text-2xl font-bold">Create New Savings Goal</h2>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Goal Details</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="goalType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Goal Type</FormLabel>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
												handleGoalTypeChange(value);
											}}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a savings goal" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{SAVING_GOALS.map((goal) => (
													<SelectItem
														key={goal.id}
														value={goal.id}
													>
														{goal.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											{selectedGoal.description}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="targetAmount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Target Amount ($)</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
													min={selectedGoal.minAmount}
													max={selectedGoal.maxAmount}
												/>
											</FormControl>
											<FormDescription>
												Min: ${selectedGoal.minAmount.toLocaleString()} - Max: $
												{selectedGoal.maxAmount.toLocaleString()}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="duration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Duration (Months)</FormLabel>
											<FormControl>
												<Input
													type="number"
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
													min={selectedGoal.minDuration}
													max={selectedGoal.maxDuration}
												/>
											</FormControl>
											<FormDescription>
												Min: {selectedGoal.minDuration} months - Max:{" "}
												{selectedGoal.maxDuration} months
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="monthlyContribution"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monthly Contribution ($)</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
										</FormControl>
										<FormDescription>
											Recommended monthly contribution based on your target and
											duration
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="bg-blue-50 p-4 rounded-lg space-y-2">
								<h3 className="font-semibold">Goal Summary</h3>
								<p className="text-sm text-blue-600">
									Interest Rate: {selectedGoal.interestRate}% APR
								</p>
								<p className="text-sm">
									Total Expected Value: $
									{(
										form.watch("monthlyContribution") *
										form.watch("duration") *
										(1 +
											((selectedGoal.interestRate / 100) *
												form.watch("duration")) /
												12)
									).toFixed(2)}
								</p>
							</div>

							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Notes (Optional)</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Add any notes about your savings goal"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex gap-4">
								<Button
									type="submit"
									className="flex-1"
								>
									Create Goal
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="flex-1"
								>
									<Link href="/dashboard/goals">Cancel</Link>
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
