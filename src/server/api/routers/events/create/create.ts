import z from "zod";
import { adminProcedure } from "../../admin/admin-procedure";

export const createRouter = adminProcedure
  .input(
    z.object({
      name: z.string(),
      type: z.string(),
      description: z.string(),
      date: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.events.create({
      data: {
        name: input.name,
        description: input.description,
        date: new Date(input.date),
        type: input.type,
      },
    });
  });
