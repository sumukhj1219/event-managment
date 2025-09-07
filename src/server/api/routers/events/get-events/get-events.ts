import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

export const getEventsRouter = publicProcedure.query(async({ctx})=>{
    try {
        const events = await ctx.db.events.findMany()
        return events
    } catch (error) {
        throw new TRPCError({
            message:"Unable to get events",
            code:"NOT_FOUND"
        })
    }
})