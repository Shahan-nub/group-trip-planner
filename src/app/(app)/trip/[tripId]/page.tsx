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
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/dashboard"
            className="
text-blue-600"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">{trip.title}</h1>

          <p className="text-gray-600 mt-2">📍 {trip.destination}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Invite Code</p>

          <p>{trip.inviteCode}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mt-10">
        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Members</p>

          <h2 className="text-3xl font-bold">{trip.members.length}</h2>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Expenses</p>

          <h2 className="text-3xl font-bold">₹{trip.totalExpense}</h2>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-gray-500">Activities</p>

          <h2 className="text-3xl font-bold">{trip.activities.length}</h2>
        </div>
      </div>

      {/* Budget  */}
      <div className="cla">
        <p>Budget: ₹{budget?.limit}</p>

        <p>Spent: ₹{budget?.spent}</p>

        <p>Remaining: ₹{budget ? budget.limit - budget.spent : 0}</p>
      </div>

      {/* Expense form  */}
      <div className="mt-10">
        <CreateExpenseForm tripId={trip.id} members={trip.members} />
      </div>

      {/* Activity form */}
      <div className="mt-10">
        <CreateActivityForm tripId={trip.id} />
      </div>

      {/* Members */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Members</h2>

        <div className="flex flex-col gap-3">
          {trip.members.map((member) => (
            <div key={member.id} className="border p-4 rounded-lg">
              <p className="font-semibold">{member.user.name}</p>

              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>

        <div className="flex flex-col gap-4">
          {trip.expenses.map((expense) => (
            <div key={expense.id} className="border rounded-xl p-5">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{expense.title}</h3>

                  <p className="text-gray-500">Paid by {expense.paidBy.name}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xl">₹{expense.amount}</p>

                  <p className="text-sm">{expense.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Balance  */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Balances</h2>

        <div className="flex flex-col gap-3">
          {trip.members.map((member) => {
            const balance = balances[member.user.id] || 0;

            return (
              <div key={member.id} className="border p-4 rounded-xl">
                <p>{member.user.name}</p>

                <p>₹{balance.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settlements */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Settlements</h2>

        <div className="flex flex-col gap-3">
          {settlements.length === 0 ? (
            <p>All expenses settled 🎉</p>
          ) : (
            settlements.map((settlement, index) => {
              const fromUser = trip.members.find(
                (m) => m.user.id === settlement.from,
              );

              const toUser = trip.members.find(
                (m) => m.user.id === settlement.to,
              );

              return (
                <div key={index} className="border p-4 rounded-xl">
                  <p>
                    {fromUser?.user.name}

                    {" pays "}

                    {toUser?.user.name}

                    {" ₹"}

                    {settlement.amount.toFixed(2)}
                  </p>

                  <SettleButton
                    tripId={trip.id}
                    senderId={settlement.from}
                    receiverId={settlement.to}
                    amount={settlement.amount}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* History  */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">History</h2>

        <div className="flex flex-col gap-3">
          {trip.settlements.map((s) => (
            <div key={s.id} className="border p-4 rounded-xl">
              {s.sender.name}
              &nbsp; paid &nbsp;
              {s.receiver.name} &nbsp; ₹{s.amount}
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary Timeline  */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>

        <div className="flex flex-col gap-4">
          {trip.activities.map((activity) => (
            <div
              key={activity.id}
              className="
border
rounded-xl
p-5"
            >
              <h3
                className="
font-bold
text-lg"
              >
                {activity.title}
              </h3>

              <p>
                📍
                {activity.location}
              </p>

              <p>
                Start:
                {new Date(activity.startTime).toLocaleString()}
              </p>

              <p>
                End:
                {new Date(activity.endTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ai Itinerary Form */}
      <AIItineraryForm tripId={trip.id} destination={trip.destination} />
    </div>
  );
}
