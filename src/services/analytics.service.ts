import { prisma } from "@/src/lib/prisma";

export async function expenseByCategory(tripId: string) {
  return prisma.expense.groupBy({
    by: ["category"],

    where: {
      tripId,
    },

    _sum: {
      amount: true,
    },
  });
}
