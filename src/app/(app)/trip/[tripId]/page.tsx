import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

import { currentUserDb } from "@/src/lib/current-user";

import { getTripById } from "@/src/services/trip.service";
import CreateExpenseForm from "@/src/components/create-expense-form";
import { calculateBalances } from "@/src/services/balance.service";
import { optimizeSettlements } from "@/src/services/settlement.service";
import SettleButton from "@/src/components/settle-button";
import CreateActivityForm from "@/src/components/create-activity-form";
import AIItineraryForm from "@/src/components/ai-itinerary-form";
import Link from "next/dist/client/link";

type Props = {
  params: Promise<{
    tripId: string;
  }>;
};

export default async function TripPage({ params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUserDb();

  if (!user) {
    redirect("/sign-in");
  }

  const { tripId } = await params;

  const trip = await getTripById(tripId, user.id);

  if (!trip) {
    notFound();
  }

  const balances = await calculateBalances(trip.id);

  const settlements = optimizeSettlements(balances);

  const budget: any = trip.budget;

  console.log(budget);

  // const remaining = budget ? budget.limit - budget.spent : 0;

  return (
    <div className="min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block text-sm font-medium"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{trip.title}</h1>

            <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">📍 {trip.destination}</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Invite Code</p>
            <p className="text-lg font-semibold font-mono">{trip.inviteCode}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-3xl p-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Members</p>
            <h2 className="text-5xl font-bold text-blue-600 dark:text-blue-400">{trip.members.length}</h2>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Expenses</p>
            <h2 className="text-5xl font-bold text-green-600 dark:text-green-400">₹{trip.totalExpense}</h2>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Activities</p>
            <h2 className="text-5xl font-bold text-purple-600 dark:text-purple-400">{trip.activities.length}</h2>
          </div>
        </div>

        {/* Budget Block */}
        <div className="glass rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">Budget Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Budget</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">₹{budget?.limit || 0}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Already Spent</p>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">₹{budget?.spent || 0}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Remaining</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">₹{budget ? (budget.limit - budget.spent).toFixed(2) : 0}</p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                  style={{width: `${Math.min(((budget?.spent || 0) / (budget?.limit || 1)) * 100, 100)}%`}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expense form  */}
        <div className="mb-10">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Add Expense</h2>
            <CreateExpenseForm tripId={trip.id} members={trip.members} />
          </div>
        </div>

        {/* Activity form */}
        <div className="mb-10">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Add Activity</h2>
            <CreateActivityForm tripId={trip.id} />
          </div>
        </div>

        {/* Members */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trip.members.map((member) => (
              <div key={member.id} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                <p className="font-semibold text-lg">{member.user.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Expenses</h2>
          <div className="flex flex-col gap-4">
            {trip.expenses.length === 0 ? (
              <p className="glass rounded-2xl p-6 text-gray-600 dark:text-gray-400">No expenses yet</p>
            ) : (
              trip.expenses.map((expense) => (
                <div key={expense.id} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{expense.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Paid by <span className="font-semibold">{expense.paidBy.name}</span></p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-2xl text-green-600 dark:text-green-400">₹{expense.amount}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">{expense.category}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Balance  */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Balances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trip.members.map((member) => {
              const balance = balances[member.user.id] || 0;
              const isPositive = balance > 0;

              return (
                <div key={member.id} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="font-semibold text-lg mb-3">{member.user.name}</p>
                  <p className={`text-3xl font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ₹{balance.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {isPositive ? 'Gets back' : 'Owes'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settlements */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Pending Settlements</h2>
          <div className="flex flex-col gap-4">
            {settlements.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-2xl">All expenses settled 🎉</p>
              </div>
            ) : (
              settlements.map((settlement, index) => {
                const fromUser = trip.members.find(
                  (m) => m.user.id === settlement.from,
                );

                const toUser = trip.members.find(
                  (m) => m.user.id === settlement.to,
                );

                return (
                  <div key={index} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                    <p className="font-semibold text-lg mb-4">
                      <span className="text-blue-600 dark:text-blue-400">{fromUser?.user.name}</span>
                      <span className="text-gray-600 dark:text-gray-400"> pays </span>
                      <span className="text-blue-600 dark:text-blue-400">{toUser?.user.name}</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₹{settlement.amount.toFixed(2)}
                      </p>
                      <SettleButton
                        tripId={trip.id}
                        senderId={settlement.from}
                        receiverId={settlement.to}
                        amount={settlement.amount}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* History  */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Settlement History</h2>
          <div className="flex flex-col gap-4">
            {trip.settlements.length === 0 ? (
              <p className="glass rounded-2xl p-6 text-gray-600 dark:text-gray-400">No settlements yet</p>
            ) : (
              trip.settlements.map((s) => (
                <div key={s.id} className="glass rounded-2xl p-6 hover:shadow-lg transition">
                  <p className="text-lg">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{s.sender.name}</span>
                    <span className="text-gray-600 dark:text-gray-400"> paid </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{s.receiver.name}</span>
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">₹{s.amount}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Itinerary Timeline  */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6">Itinerary</h2>
          <div className="flex flex-col gap-4">
            {trip.activities.length === 0 ? (
              <p className="glass rounded-2xl p-6 text-gray-600 dark:text-gray-400">No activities planned yet</p>
            ) : (
              trip.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="glass rounded-2xl p-6 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-xl mb-3">{activity.title}</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📍 {activity.location}</p>
                    <p>🕐 Start: {new Date(activity.startTime).toLocaleString()}</p>
                    <p>🕐 End: {new Date(activity.endTime).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Itinerary Form */}
        <div className="mb-10">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Generate AI Itinerary</h2>
            <AIItineraryForm tripId={trip.id} destination={trip.destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
