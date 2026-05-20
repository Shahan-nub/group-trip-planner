"use server";

import { prisma } from "@/src/lib/prisma";
import { currentUserDb } from "@/src/lib/current-user";

import { revalidatePath } from "next/cache";

export async function joinTrip(
  inviteCode: string
) {
  const user = await currentUserDb();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const trimmedCode = inviteCode.trim();

  if (!trimmedCode) {
    throw new Error("Invite code required");
  }

  // Find trip
  const trip = await prisma.trip.findUnique({
    where: {
      inviteCode: trimmedCode,
    },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  // Already joined?
  const existingMember =
    await prisma.tripMember.findUnique({
      where: {
        userId_tripId: {
          userId: user.id,
          tripId: trip.id,
        },
      },
    });

  if (existingMember) {
    throw new Error(
      "Already a member of this trip"
    );
  }

  // Join trip
  await prisma.tripMember.create({
    data: {
      tripId: trip.id,
      userId: user.id,
      role: "MEMBER",
    },
  });

  revalidatePath("/dashboard");

  return trip;
}