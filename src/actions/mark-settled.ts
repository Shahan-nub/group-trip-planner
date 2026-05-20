"use server";

import { prisma } from "@/src/lib/prisma";

import { currentUserDb } from "@/src/lib/current-user";

import { revalidatePath } from "next/cache";
import { redis } from "../lib/redis";

type Input = {
  tripId: string;

  senderId: string;

  receiverId: string;

  amount: number;
};

export async function markSettled(values: Input) {
  const user = await currentUserDb();

  if (!user) throw new Error("Unauthorized");

  await prisma.settlement.create({
    data: {
      tripId: values.tripId,

      senderId: values.senderId,

      receiverId: values.receiverId,

      amount: values.amount,

      isSettled: true,
    },
  });

  revalidatePath(`/trip/${values.tripId}`);

  await redis.del(`trip:${values.tripId}`);
}
