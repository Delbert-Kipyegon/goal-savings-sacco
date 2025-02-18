import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, ArrowRight } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:flex md:space-x-4 gap-2 md:gap-0">
        <Button asChild className="flex items-center">
          <Link href="/dashboard/savings/deposit">
            <Plus className="mr-2 h-4 w-4" /> Deposit
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/dashboard/goals/new">
            <Plus className="mr-2 h-4 w-4" /> New Goal
          </Link>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-sm md:text-base">Total Savings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <p className="text-2xl md:text-3xl font-bold">$2,450.00</p>
            <p className="text-xs md:text-sm text-gray-500">+$150 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-sm md:text-base">Active Goals</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <p className="text-2xl md:text-3xl font-bold">3</p>
            <p className="text-xs md:text-sm text-gray-500">2 on track</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-sm md:text-base">Group Savings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <p className="text-2xl md:text-3xl font-bold">$1,200.00</p>
            <p className="text-xs md:text-sm text-gray-500">Across 2 groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-sm md:text-base">Next Payment Due</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <p className="text-2xl md:text-3xl font-bold">5 days</p>
            <p className="text-xs md:text-sm text-gray-500">$100 scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <Link href="/dashboard/transactions">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm md:text-base">$</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">Deposit to Emergency Fund</p>
                    <p className="text-xs md:text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
                <span className="text-green-600 font-medium text-sm md:text-base">+$100.00</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 