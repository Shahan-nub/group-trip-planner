"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
      toast.error("Max 10 days");
      return;
    }

    if (budget > 100000) {
      toast.error("Budget too large");

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
    } catch (err : any) {
      toast.error(err.message);
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">AI Itinerary Generator</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">📅 Days</label>
            <input
              type="number"
              min="1"
              max="10"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="glass-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">💰 Budget</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="glass-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">✨ Trip Type</label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="glass-sm rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Adventure</option>
              <option>Relaxed</option>
              <option>Nightlife</option>
              <option>Budget</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="glass-sm rounded-xl px-6 py-3 w-full font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition duration-200 transform hover:scale-105"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

      {result.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Generated Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-3">
                  Day {item.day} - {item.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">📍 {item.location}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <button
            disabled={saving}
            onClick={async () => {
              try {
                setSaving(true);
                await saveAIItinerary(tripId, result);
                setSaved(true);
                setResult([]);
                setDays(3);
                setBudget(10000);
                setTripType("Adventure");
                setTimeout(() => {
                  setSaved(false);
                }, 3000);
              } catch (err) {
                console.log(err);
              } finally {
                setSaving(false);
              }
            }}
            className="glass-sm rounded-xl px-8 py-3 w-full font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition duration-200 transform hover:scale-105"
          >
            {saving ? "Saving..." : "Save to Trip"}
          </button>

          {saved && (
            <div className="glass rounded-2xl p-4 text-center">
              <p className="text-green-600 dark:text-green-400 font-semibold">✅ Saved to trip itinerary!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
