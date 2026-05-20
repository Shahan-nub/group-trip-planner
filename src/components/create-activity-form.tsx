"use client";

import { useState } from "react";

import { createActivity } from "@/src/actions/create-activity";

type Props = {
  tripId: string;
};

export default function CreateActivityForm({ tripId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      await createActivity({
        tripId,

        title: formData.get("title") as string,

        description: formData.get("description") as string,

        location: formData.get("location") as string,

        startTime: formData.get("startTime") as string,

        endTime: formData.get("endTime") as string,
      });

      alert("Activity added");
    } catch (err: any) {
      alert(err.message);
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
        placeholder="Activity title"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input 
        name="location" 
        placeholder="Location"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <textarea 
        name="description" 
        placeholder="Description"
        className="glass-sm rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
      />

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Start Time</label>
        <input 
          type="datetime-local" 
          name="startTime" 
          required
          className="glass-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">End Time</label>
        <input 
          type="datetime-local" 
          name="endTime" 
          required
          className="glass-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="glass-sm rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 transition duration-200 transform hover:scale-105"
      >
        {loading ? "Adding..." : "Add Activity"}
      </button>
    </form>
  );
}
