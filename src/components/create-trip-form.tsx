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
      <input name="title" placeholder="Trip title" className="border p-2" />

      <input
        name="destination"
        placeholder="Destination"
        className="border p-2"
      />

      <input
        required
        type="number"
        name="budget"
        placeholder="Trip Budget"
        className="border p-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2"
      />

      <input type="date" name="startDate" className="border p-2" />

      <input type="date" name="endDate" className="border p-2" />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2"
      >
        {loading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  );
}
