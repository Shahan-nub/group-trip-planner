import { z } from "zod";

// export const CreateExpenseSchema =
//   z.object({
//     tripId: z.string(),

//     title: z.string().min(2),

//     amount: z.coerce.number().positive(),

//     category: z.enum([
//       "FOOD",
//       "HOTEL",
//       "TRANSPORT",
//       "SHOPPING",
//       "FUEL",
//       "ACTIVITIES",
//       "OTHER",
//     ]),
//   });

export const CreateExpenseSchema =
  z.object({
    tripId: z.string(),

    title: z.string().min(2),

    amount: z.coerce.number().positive(),

    paidById: z.string(),

    category: z.enum([
      "FOOD",
      "HOTEL",
      "TRANSPORT",
      "SHOPPING",
      "FUEL",
      "ACTIVITIES",
      "OTHER",
    ]),
  });

export type CreateExpenseInput =
  z.infer<typeof CreateExpenseSchema>;