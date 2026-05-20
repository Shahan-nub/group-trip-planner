"use client";

import { useState } from "react";

import { createExpense } from "@/src/actions/create-expense";
import toast from "react-hot-toast";

type Props = {
  tripId: string;
  members: any[];
};

export default function CreateExpenseForm({ tripId, members }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      await createExpense({
        tripId,

        title: formData.get("title") as string,

        amount: Number(formData.get("amount")),

        paidById: formData.get("paidById") as string,

        category: formData.get("category") as any,
      });

      toast.success("Expense added!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-4 max-w-md"
    >
      <input
        required
        name="title"
        placeholder="Expense title"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        required
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <select name="category" className="glass-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
        <option value="FOOD">🍔 Food</option>
        <option value="HOTEL">🏨 Hotel</option>
        <option value="TRANSPORT">🚗 Transport</option>
        <option value="SHOPPING">🛍️ Shopping</option>
        <option value="FUEL">⛽ Fuel</option>
        <option value="ACTIVITIES">🎢 Activities</option>
        <option value="OTHER">📌 Other</option>
      </select>

      <select name="paidById" className="glass-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
        <option value="">Select who paid</option>
        {members.map((member) => (
          <option key={member.user.id} value={member.user.id}>
            {member.user.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="glass-sm rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition duration-200 transform hover:scale-105"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
