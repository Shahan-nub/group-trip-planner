import { prisma } from "@/src/lib/prisma";

export async function calculateBalances(
  tripId: string
) {
  const expenses =
    await prisma.expense.findMany({
      where: { tripId },

      include: {
        paidBy: true,

        splits: {
          include: {
            user: true,
          },
        },
      },
    });

  const settlements =
    await prisma.settlement.findMany({
      where: {
        tripId,

        isSettled: true,
      },
    });

  const balances:
    Record<string, number> = {};

  // Expense balances
  for (const expense of expenses) {
    const payer =
      expense.paidById;

    if (!balances[payer]) {
      balances[payer] = 0;
    }

    balances[payer] +=
      expense.amount;

    for (
      const split of expense.splits
    ) {
      if (
        !balances[
          split.userId
        ]
      ) {
        balances[
          split.userId
        ] = 0;
      }

      balances[
        split.userId
      ] -= split.amount;
    }
  }

  // Remove settled amounts
  for (
    const settlement of settlements
  ) {
    balances[
      settlement.senderId
    ] += settlement.amount;

    balances[
      settlement.receiverId
    ] -= settlement.amount;
  }

  return balances;
}