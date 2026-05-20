import Link from "next/link";

type TripCardProps = {
  trip: any;
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="glass p-6 hover:shadow-2xl hover:scale-105 cursor-pointer group">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground group-hover:text-blue-500">
            {trip.title}
          </h2>

          <p className="text-sm opacity-70">📍 {trip.destination}</p>

          <div className="space-y-2 pt-4 border-t border-white/10">
            <p className="text-sm">
              <span className="opacity-60">Members:</span>
              <span className="ml-2 font-semibold">{trip.members.length}</span>
            </p>

            <p className="text-sm">
              <span className="opacity-60">Expenses:</span>
              <span className="ml-2 font-semibold">₹{trip.totalExpense.toFixed(2)}</span>
            </p>
          </div>

          <p className="text-xs opacity-50 pt-2 font-mono">
            Code: {trip.inviteCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
