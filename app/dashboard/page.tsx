"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  user: {
    email: string;
    name: string;
    memberSince: string;
  };
  stats: {
    totalGoals: number;
    completedGoals: number;
    upcomingGoals: number;
    completionRate: number;
  };
  recentGoals: Array<{
    _id: string;
    title: string;
    completed: boolean;
    targetDate: string;
    createdAt: string;
  }>;
  goalsByStatus: {
    completed: number;
    inProgress: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        setError("Failed to load dashboard");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {data.user.name}!</h1>
        <p className="text-gray-600">
          Member since {new Date(data.user.memberSince).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Goals</h3>
          <p className="text-3xl font-bold">{data.stats.totalGoals}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {data.stats.completedGoals}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.stats.upcomingGoals}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completion Rate</h3>
          <p className="text-3xl font-bold">
            {data.stats.completionRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Goals</h2>
          {data.recentGoals.length > 0 ? (
            <ul className="space-y-3">
              {data.recentGoals.map((goal) => (
                <li
                  key={goal._id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{goal.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      goal.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {goal.completed ? "Completed" : "In Progress"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No goals yet</p>
          )}
          <div className="mt-4">
            <Link
              href="/dashboard/goals"
              className="text-blue-600 hover:text-blue-800"
            >
              View all goals →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Completed</span>
                <span>{data.goalsByStatus.completed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (data.goalsByStatus.completed /
                        (data.goalsByStatus.completed +
                          data.goalsByStatus.inProgress)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>In Progress</span>
                <span>{data.goalsByStatus.inProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (data.goalsByStatus.inProgress /
                        (data.goalsByStatus.completed +
                          data.goalsByStatus.inProgress)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
