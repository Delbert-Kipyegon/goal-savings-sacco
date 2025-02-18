"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	LayoutDashboard,
	PiggyBank,
	Target,
	History,
	Users,
	User,
	Settings,
	Menu,
	X,
} from "lucide-react";

const sidebarLinks = [
	{ href: "/dashboard", label: "Overview", icon: LayoutDashboard },
	{ href: "/dashboard/savings/deposit", label: "My Savings", icon: PiggyBank },
	{ href: "/dashboard/goals", label: "Savings Goals", icon: Target },
	{ href: "/dashboard/transactions", label: "Transactions", icon: History },
	{ href: "/dashboard/groups", label: "Savings Groups", icon: Users },
	{ href: "/dashboard/profile", label: "Profile", icon: User },
	{ href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Mobile Header */}
			<header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
				<Link
					href="/dashboard"
					className="text-xl font-bold"
				>
					GoalSacco
				</Link>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					{isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
				</Button>
			</header>

			{/* Sidebar - Mobile Overlay */}
			{isSidebarOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 text-white
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
			>
				<div className="p-6 hidden md:block">
					<Link
						href="/dashboard"
						className="text-xl font-bold"
					>
						GoalSacco
					</Link>
				</div>
				<nav className="mt-6 space-y-1 px-2">
					{sidebarLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Link
								key={link.href}
								href={link.href}
								className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
								onClick={() => setIsSidebarOpen(false)}
							>
								<Icon className="mr-3 h-5 w-5" />
								{link.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-h-screen">
				{/* Desktop Header */}
				<header className="hidden md:flex bg-white border-b h-16 items-center justify-between px-6">
					<div className="flex items-center space-x-4">
						<span className="font-semibold">Welcome, User</span>
					</div>
					<Link href="/">
						<Button variant="destructive">Logout</Button>
					</Link>
				</header>

				{/* Main Content Area */}
				<main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
