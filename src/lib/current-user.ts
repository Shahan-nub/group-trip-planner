import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function currentUserDb() {
  const { userId } = await auth();

  if (!userId) return null;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  // Fetch from Clerk
  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);

  // Create DB user
  const user = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name:
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),

      username: clerkUser.username,

      imageUrl: clerkUser.imageUrl,
    },
  });

  return user;
}