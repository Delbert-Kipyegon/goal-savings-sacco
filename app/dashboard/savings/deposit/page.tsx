"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function DepositPage() {
  const [amount, setAmount] = useState("")
  const [goal, setGoal] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add deposit logic here
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Record New Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Select Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a savings goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency Fund</SelectItem>
                  <SelectItem value="house">House Down Payment</SelectItem>
                  <SelectItem value="vacation">Vacation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Add any notes about this deposit"
              />
            </div>

            <Button type="submit" className="w-full">
              Record Deposit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 