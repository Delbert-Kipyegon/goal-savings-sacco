import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Plus, ArrowRight } from "lucide-react"

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: "Family Savings Circle",
      members: 5,
      totalSavings: 2500,
      monthlyTarget: 500,
    },
    {
      id: 2,
      name: "Investment Club",
      members: 8,
      totalSavings: 5000,
      monthlyTarget: 1000,
    },
    // Add more groups as needed
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Savings Groups</h2>
        <Button asChild>
          <Link href="/dashboard/groups/create">
            <Plus className="h-4 w-4 mr-2" /> Create New Group
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{group.name}</span>
                <Users className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Members</p>
                    <p className="font-medium">{group.members}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Savings</p>
                    <p className="font-medium">${group.totalSavings}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Monthly Target</p>
                    <p className="font-medium">${group.monthlyTarget}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Your Contribution</p>
                    <p className="font-medium">$300</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/groups/${group.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 