"use server";

import { prisma } from "@/src/lib/prisma";
import { currentUserDb } from "@/src/lib/current-user";
import { CreateTripInput, CreateTripSchema } from "@/src/lib/validations/trip";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

export async function createTrip(values: CreateTripInput) {
  const user = await currentUserDb();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const validated = CreateTripSchema.safeParse(values);

  if (!validated.success) {
    console.log(validated.error.flatten());
    throw new Error("Invalid fields");
  }

  const { title, description, destination, budget, startDate, endDate } =
    validated.data;

  const inviteCode = uuidv4().slice(0, 8);

  // Transaction
  const trip = await prisma.$transaction(async (tx) => {
    const createdTrip = await tx.trip.create({
      data: {
        title,
        description,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),

        creatorId: user.id,

        inviteCode,
      },
    });

    // Add creator as admin
    await tx.tripMember.create({
      data: {
        tripId: createdTrip.id,
        userId: user.id,
        role: "ADMIN",
      },
    });

    await tx.budget.create({
      data: {
        tripId: createdTrip.id,
        limit: budget,
      },
    });

    return createdTrip;
  });

  revalidatePath("/dashboard");

  return trip;
}
