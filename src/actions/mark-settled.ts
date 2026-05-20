"use server";

import { prisma } from "@/src/lib/prisma";

import { currentUserDb } from "@/src/lib/current-user";

import { revalidatePath } from "next/cache";

type Input = {
  tripId: string;

  senderId: string;

  receiverId: string;

  amount: number;
};

export async function markSettled(
  values: Input
) {
  const user =
    await currentUserDb();

  if (!user)
    throw new Error(
      "Unauthorized"
    );

  await prisma.settlement.create({
    data: {
      tripId: values.tripId,

      senderId:
        values.senderId,

      receiverId:
        values.receiverId,

      amount:
        values.amount,

      isSettled: true,
    },
  });

  revalidatePath(
    `/trip/${values.tripId}`
  );
}