"use server";

import { prisma } from "@/src/lib/prisma";

import { currentUserDb } from "@/src/lib/current-user";

import {
  CreateExpenseInput,
  CreateExpenseSchema,
} from "@/src/lib/validations/expense";

import { revalidatePath } from "next/cache";
import { redis } from "../lib/redis";

export async function createExpense(values: CreateExpenseInput) {
  const user = await currentUserDb();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const validated = CreateExpenseSchema.safeParse(values);

  if (!validated.success) {
    console.log(validated.error.flatten());

    throw new Error("Invalid fields");
  }

  const { tripId, title, amount, category, paidById } = validated.data;

  // Get trip members
  const members = await prisma.tripMember.findMany({
    where: {
      tripId,
    },
  });

  if (members.length === 0) {
    throw new Error("No members found");
  }

  const splitAmount = amount / members.length;

  // TRANSACTION
  await prisma.$transaction(async (tx) => {
    // Create expense
    const expense = await tx.expense.create({
      data: {
        title,
        amount,
        category,

        paidById,

        tripId,
      },
    });

    // Create splits
    for (const member of members) {
      await tx.expenseSplit.create({
        data: {
          expenseId: expense.id,

          userId: member.userId,

          amount: splitAmount,

          isPaid: member.userId === user.id,
        },
      });
    }

    // Update trip total
    await tx.trip.update({
      where: { id: tripId },

      data: {
        totalExpense: {
          increment: amount,
        },
      },
    });

    await tx.budget.updateMany({
      where: {
        tripId,
      },

      data: {
        spent: {
          increment: amount,
        },
      },
    });
  });

  revalidatePath(`/trip/${tripId}`);

  await redis.del(`trip:${tripId}`);
}
