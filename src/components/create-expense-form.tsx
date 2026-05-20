"use client";

import { useState } from "react";

import { createExpense } from "@/src/actions/create-expense";

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

      alert("Expense added!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-3 border rounded-xl p-5"
    >
      <h2 className="text-xl font-bold">Add Expense</h2>

      <input
        required
        name="title"
        placeholder="Expense title"
        className="border p-2 rounded"
      />

      <input
        required
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        className="border p-2 rounded"
      />

      <select name="category" className="border p-2 rounded">
        <option value="FOOD">Food</option>

        <option value="HOTEL">Hotel</option>

        <option value="TRANSPORT">Transport</option>

        <option value="SHOPPING">Shopping</option>

        <option value="FUEL">Fuel</option>

        <option value="ACTIVITIES">Activities</option>

        <option value="OTHER">Other</option>
      </select>

      <select name="paidById" className="border p-2 rounded">
        {members.map((member) => (
          <option key={member.user.id} value={member.user.id}>
            {member.user.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 rounded"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
