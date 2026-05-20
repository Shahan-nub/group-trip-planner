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
      className="border rounded-xl p-5 flex flex-col gap-3"
    >
      <h2 className="text-xl font-bold">Add Activity</h2>

      <input required name="title" placeholder="Activity" />

      <input name="location" placeholder="Location" />

      <textarea name="description" placeholder="Description" />

      <input type="datetime-local" name="startTime" required />

      <input type="datetime-local" name="endTime" required />

      <button>{loading ? "Adding..." : "Add"}</button>
    </form>
  );
}
