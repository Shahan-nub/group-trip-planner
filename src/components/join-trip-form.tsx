"use client";

import { useState } from "react";

import { joinTrip } from "@/src/actions/join-trip";

export default function JoinTripForm() {
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    setLoading(true);

    try {
      const inviteCode =
        formData.get("inviteCode") as string;

      await joinTrip(inviteCode);

      alert("Joined trip!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        required
        name="inviteCode"
        placeholder="Enter invite code"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition flex-1"
      />

      <button
        type="submit"
        disabled={loading}
        className="glass-sm rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition duration-200 transform hover:scale-105 whitespace-nowrap"
      >
        {loading ? "Joining..." : "Join"}
      </button>
    </form>
  );
}