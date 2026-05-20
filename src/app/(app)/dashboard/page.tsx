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
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Welcome {user.name}</h1>

      <div className="mb-10">
        <CreateTripForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      <div className="mb-10">
        <JoinTripForm />
      </div>
    </div>
  );
}
