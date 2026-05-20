"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setBudget(tripId: string, limit: number) {
  await prisma.budget.upsert({
    where: {
      tripId,
    },

    update: {
      limit,
    },

    create: {
      tripId,
      limit,
    },
  });

  revalidatePath(`/trip/${tripId}`);
}
