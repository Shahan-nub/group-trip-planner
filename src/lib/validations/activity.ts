import { z } from "zod";

export const CreateActivitySchema =
  z.object({
    tripId: z.string(),

    title:
      z.string()
      .min(2),

    description:
      z.string()
      .optional(),

    location:
      z.string()
      .optional(),

    startTime:
      z.string(),

    endTime:
      z.string(),
});

export type CreateActivityInput =
z.infer<
typeof CreateActivitySchema
>;