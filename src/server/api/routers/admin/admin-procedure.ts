import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admins only" });
  }
  return next();
});
