import Link from "next/link";

type TripCardProps = {
  trip: any;
};

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/trip/${trip.id}`}>
      <div className="glass rounded-3xl p-6 hover:shadow-2xl transition duration-300 cursor-pointer transform hover:scale-105 h-full">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground line-clamp-2">{trip.title}</h2>

          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">📍 {trip.destination}</p>

          <div className="pt-2 space-y-2 border-t border-glass-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Members</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{trip.members.length}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Expenses</span>
              <span className="font-semibold text-green-600 dark:text-green-400">₹{trip.totalExpense.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-lg p-2 font-mono">
            Code: {trip.inviteCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
