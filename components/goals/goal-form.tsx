"use client";

import { useState } from "react";

interface GoalFormProps {
  onSubmit: (goal: {
    title: string;
    amount: number;
    targetDate: string;
    description?: string;
  }) => Promise<void>;
}

export function GoalForm({ onSubmit }: GoalFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const goal = {
      title: formData.get("title") as string,
      amount: parseFloat(formData.get("amount") as string),
      targetDate: formData.get("targetDate") as string,
      description: formData.get("description") as string,
    };

    try {
      await onSubmit(goal);
      e.currentTarget.reset();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create goal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Goal Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Target Amount (USD) *
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="targetDate"
          className="block text-sm font-medium text-gray-700"
        >
          Target Date *
        </label>
        <input
          type="date"
          id="targetDate"
          name="targetDate"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Goal"}
      </button>
    </form>
  );
}
