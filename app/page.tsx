import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
				<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
					<div className="text-2xl font-bold">Goalify</div>
					<div className="space-x-4">
						<Button
							variant="ghost"
							className="text-white hover:text-blue-600"
							asChild
						>
							<Link href="/login">Login</Link>
						</Button>
						<Button
							className="bg-white text-blue-600 hover:bg-blue-50"
							asChild
						>
							<Link href="/register">Get Started</Link>
						</Button>
					</div>
				</nav>

				<div className="container mx-auto px-6 py-24 text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-8">
						Achieve Your Financial Goals Together
					</h1>
					<p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
						Join our community-driven savings platform and make your financial
						dreams a reality through collective saving and support.
					</p>
					<Button
						size="lg"
						className="bg-white text-blue-600 hover:bg-blue-50"
						asChild
					>
						<Link href="/register">Start Saving Today</Link>
					</Button>
				</div>
			</header>

			{/* Features Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">
						Why Choose Goalify?
					</h2>
					<div className="grid md:grid-cols-3 gap-12">
						<Card>
							<CardContent className="pt-6">
								<div className="text-center">
									<div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-blue-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-4">
										Smart Goal Setting
									</h3>
									<p className="text-gray-600">
										Set personalized savings goals and track your progress with
										our intuitive dashboard.
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="text-center">
									<div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-blue-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-4">
										Community Support
									</h3>
									<p className="text-gray-600">
										Join savings groups with like-minded individuals and
										motivate each other to succeed.
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<div className="text-center">
									<div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-8 w-8 text-blue-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-semibold mb-4">Secure Savings</h3>
									<p className="text-gray-600">
										Your money is safe with our bank-grade security and
										transparent operations.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
					<div className="grid md:grid-cols-4 gap-8">
						{[
							{
								step: "1",
								title: "Create Account",
								description: "Sign up and set up your profile in minutes",
							},
							{
								step: "2",
								title: "Set Goals",
								description: "Define your savings goals and timeline",
							},
							{
								step: "3",
								title: "Join Groups",
								description: "Connect with others sharing similar goals",
							},
							{
								step: "4",
								title: "Start Saving",
								description: "Make regular contributions and track progress",
							},
						].map((item, index) => (
							<div
								key={index}
								className="text-center"
							>
								<div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
									{item.step}
								</div>
								<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
								<p className="text-gray-600">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">
						What Our Members Say
					</h2>
					<div className="grid md:grid-cols-3 gap-12">
						{[
							{
								quote:
									"Goalify helped me save for my dream house. The community support made all the difference!",
								author: "Sarah Johnson",
								role: "Member since 2023",
							},
							{
								quote:
									"The platform makes it easy to track my savings and stay motivated. Best decision I've made!",
								author: "Michael Chen",
								role: "Member since 2023",
							},
							{
								quote:
									"I love how I can connect with others who have similar financial goals. It's truly inspiring!",
								author: "Lisa Rodriguez",
								role: "Member since 2023",
							},
						].map((testimonial, index) => (
							<Card key={index}>
								<CardContent className="pt-6">
									<div className="text-center">
										<p className="text-gray-600 mb-4">
											&quot;{testimonial.quote}&quot;
										</p>
										<p className="font-semibold">{testimonial.author}</p>
										<p className="text-sm text-gray-500">{testimonial.role}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-blue-600 text-white">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-4xl font-bold mb-8">
						Ready to Start Your Savings Journey?
					</h2>
					<p className="text-xl mb-12 max-w-2xl mx-auto">
						Join thousands of members who are achieving their financial goals
						with Goalify.
					</p>
					<Button
						size="lg"
						className="bg-white text-blue-600 hover:bg-blue-50"
						asChild
					>
						<Link href="/register">Get Started Now</Link>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="container mx-auto px-6">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-xl font-bold mb-4">Goalify</h3>
							<p className="text-gray-400">
								Making savings goals achievable together.
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2">
								<li>
									<Link
										href="/about"
										className="text-gray-400 hover:text-white"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="/features"
										className="text-gray-400 hover:text-white"
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="text-gray-400 hover:text-white"
									>
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Legal</h4>
							<ul className="space-y-2">
								<li>
									<Link
										href="/privacy"
										className="text-gray-400 hover:text-white"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-gray-400 hover:text-white"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Connect</h4>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white"
									>
										Twitter
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white"
									>
										Facebook
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-400 hover:text-white"
									>
										Instagram
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
						<p>
							&copy; {new Date().getFullYear()} Goalify. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
