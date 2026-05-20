import { prisma } from "@/src/lib/prisma";
import { redis } from "../lib/redis";
import { Prisma } from "../app/generated/prisma/client";

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

// export async function getTripById(tripId: string, userId: string) {
//   return prisma.trip.findFirst({
//     where: {
//       id: tripId,

//       // IMPORTANT SECURITY CHECK
//       members: {
//         some: {
//           userId,
//         },
//       },
//     },

//     include: {
//       creator: true,

//       members: {
//         include: {
//           user: true,
//         },
//       },

//       expenses: {
//         include: {
//           paidBy: true,
//           splits: true,
//         },
//       },

//       settlements: {
//         include: {
//           sender: true,
//           receiver: true,
//         },
//       },

//       activities: {
//         orderBy: {
//           startTime: "asc",
//         },
//       },
//       budget: true,
//     },
//   });
// }

// cached version of getTripById using Redis

type TripWithRelations = Prisma.TripGetPayload<{
  include: {
    creator: true;

    members: {
      include: {
        user: true;
      };
    };

    expenses: {
      include: {
        paidBy: true;

        splits: true;
      };
    };

    settlements: {
      include: {
        sender: true;

        receiver: true;
      };
    };

    activities: true;

    budget: true;
  };
}>;

export async function getTripById(
  tripId: string,

  userId: string,
): Promise<TripWithRelations | null> {
  const cacheKey = `trip:${tripId}`;

  // Check Redis first
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("CACHE HIT");

    return cached as TripWithRelations;
  }

  console.log("CACHE MISS");

  const trip: TripWithRelations | null = await prisma.trip.findFirst({
    where: {
      id: tripId,

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

  if (trip) {
    await redis.set(
      cacheKey,
      trip,

      { ex: 300 }, // 5 min
    );
  }

  return trip;
}
