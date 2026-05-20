import { prisma } from "@/src/lib/prisma";

export async function getUserTrips(userId: string) {
  return prisma.trip.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      members: {
        include: {
          user: true,
        },
      },

      expenses: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTripById(tripId: string, userId: string) {
  return prisma.trip.findFirst({
    where: {
      id: tripId,

      // IMPORTANT SECURITY CHECK
      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      creator: true,

      members: {
        include: {
          user: true,
        },
      },

      expenses: {
        include: {
          paidBy: true,
          splits: true,
        },
      },

      settlements: {
        include: {
          sender: true,
          receiver: true,
        },
      },

      activities: {
        orderBy: {
          startTime: "asc",
        },
      },
      budget: true,
    },
  });
}
