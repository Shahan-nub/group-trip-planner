"use client";

import { useState } from "react";
import { createTrip } from "@/src/actions/create-trip";

export default function CreateTripForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      await createTrip({
        title: formData.get("title") as string,
        destination: formData.get("destination") as string,
        description: formData.get("description") as string,
        budget: Number(formData.get("budget")),
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
      });

      alert("Trip created!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input 
        name="title" 
        placeholder="Trip title" 
        className="glass-sm rounded-xl p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
      />

      <input
        name="destination"
        placeholder="Destination"
        className="glass-sm rounded-xl p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        required
        type="number"
        name="budget"
        placeholder="Trip Budget"
        className="glass-sm rounded-xl p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="glass-sm rounded-xl p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
      />

      <input 
        type="date" 
        name="startDate" 
        className="glass-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
      />

      <input 
        type="date" 
        name="endDate" 
        className="glass-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
      />

      <button
        type="submit"
        disabled={loading}
        className="glass-sm rounded-xl p-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition duration-200 transform hover:scale-105"
      >
        {loading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
}
