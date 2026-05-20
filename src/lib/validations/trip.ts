import { z } from "zod";

export const CreateTripSchema =
z.object({

 title:
 z.string()
 .min(3),

 destination:
 z.string()
 .min(2),

 description:
 z.string()
 .optional(),

 budget:
 z.coerce
 .number()
 .positive(),

 startDate:
 z.string(),

 endDate:
 z.string()

});

export type CreateTripInput = z.infer<
  typeof CreateTripSchema
>;