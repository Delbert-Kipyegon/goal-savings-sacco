"use client";

import { GoalForm } from "@/components/goals/goal-form";
import { useEffect, useState } from "react";

interface Goal {
  _id: string;
  title: string;
  description?: string;
  targetDate?: string;
  completed: boolean;
  createdAt: Date;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/goals");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch goals");
      }

      const data = await response.json();
      setGoals(data.goals);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      setError(error instanceof Error ? error.message : "Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();

    // Optional: Set up polling to keep goals fresh
    const interval = setInterval(fetchGoals, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleComplete = async (goalId: string) => {
    try {
      const response = await fetch("/api/goals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goalId,
          completed: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      // Refresh goals after completion
      fetchGoals();
    } catch (error) {
      console.error("Error completing goal:", error);
      setError("Failed to complete goal");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">My Goals</h1>

      <GoalForm onSuccess={fetchGoals} />

      {error && (
        <div className="my-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Goals</h2>
        {goals.length === 0 ? (
          <p className="text-gray-500">No goals yet. Create one above!</p>
        ) : (
          <ul className="space-y-4">
            {goals.map((goal) => (
              <li
                key={goal._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                    {goal.description && (
                      <p className="text-gray-600 mt-1">{goal.description}</p>
                    )}
                    {goal.targetDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Created: {new Date(goal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleComplete(goal._id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        goal.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {goal.completed ? "Completed" : "Mark Complete"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
