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
      className="flex gap-2"
    >
      <input
        required
        name="inviteCode"
        placeholder="Enter invite code"
        className="border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 rounded"
      >
        {loading ? "Joining..." : "Join"}
      </button>
    </form>
  );
}