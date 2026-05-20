import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { currentUserDb } from "@/src/lib/current-user";

import CreateTripForm from "@/src/components/create-trip-form";

import { getUserTrips } from "@/src/services/trip.service";

import TripCard from "@/src/components/trip-card";
import JoinTripForm from "@/src/components/join-trip-form";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUserDb();

  if (!user) {
    redirect("/sign-in");
  }

  const trips = await getUserTrips(user.id);

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome {user.name}</h1>

        <div className="mb-12">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-6">Create a New Trip</h2>
            <CreateTripForm />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="glass rounded-3xl p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Join an Existing Trip</h2>
            <JoinTripForm />
          </div>
        </div>
      </div>
    </div>
  );
}
