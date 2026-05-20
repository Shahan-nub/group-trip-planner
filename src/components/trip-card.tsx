import Link from "next/link";

type TripCardProps = {
  trip: any;
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="border rounded-xl p-5 shadow-sm">
          <h2 className="text-2xl font-bold">{trip.title}</h2>

          <p className="text-gray-600">📍 {trip.destination}</p>

          <p className="mt-2">Members: {trip.members.length}</p>

          <p>Expenses: ₹{trip.totalExpense.toFixed(2)}</p>

          <p className="text-sm text-gray-500 mt-2">
            Invite Code: {trip.inviteCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
