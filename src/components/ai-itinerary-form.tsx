"use client";

import { useState } from "react";

import { generateItinerary } from "@/src/actions/generate-itinerary";
import { saveAIItinerary } from "../actions/save-ai-itinerary";

export default function AIItineraryForm({
  tripId,

  destination,
}: {
  tripId: string;

  destination: string;
}) {
  const [days, setDays] = useState(3);

  const [budget, setBudget] = useState(10000);

  const [tripType, setTripType] = useState("Adventure");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any[]>([]);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    if (days > 10) {
      alert("Max 10 days");
      return;
    }

    if (budget > 100000) {
      alert("Budget too large");

      return;
    }

    setLoading(true);

    try {
      const data = await generateItinerary(
        destination,

        days,

        budget,

        tripType,
      );

      setResult(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div
      className="
border
rounded-xl
p-5
mt-10"
    >
      <h2
        className="
text-xl
font-bold
mb-4"
      >
        AI Planner
      </h2>

      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="
border
p-2
mb-2"
      />

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="
border
p-2
mb-2"
      />

      <select
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        className="
border
p-2"
      >
        <option>Adventure</option>

        <option>Relaxed</option>

        <option>Nightlife</option>

        <option>Budget</option>
      </select>

      <button
        onClick={handleGenerate}
        className="
bg-blue-600
text-white
px-4
py-2
rounded
ml-2"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div
        className="
mt-5
space-y-3"
      >
        {result.map((item, i) => (
          <div
            key={i}
            className="
border
rounded
p-3"
          >
            <h3>
              Day
              {item.day}-{item.title}
            </h3>

            <p>
              📍
              {item.location}
            </p>

            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <button
        disabled={saving || result.length === 0}
        onClick={async () => {
          try {
            setSaving(true);

            await saveAIItinerary(
              tripId,

              result,
            );

            setSaved(true);

            // reset form
            setResult([]);

            setDays(3);

            setBudget(10000);

            setTripType("Adventure");

            // remove msg later
            setTimeout(() => {
              setSaved(false);
            }, 3000);
          } catch (err) {
            console.log(err);
          } finally {
            setSaving(false);
          }
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        {saving ? "Saving..." : "Save To Trip"}
      </button>

      {saved && (
        <p
          className=" text-green-600 mt-2 font-semibold"
        >
          ✅ Saved to trip itinerary
        </p>
      )}
    </div>
  );
}
