import { TRPCError } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "~/server/api/trpc";

export const getEventByIdRouter = publicProcedure.input(
    z.object({
        id:z.string()
    })
).query(async({ctx, input})=>{
    try {
        const event = await ctx.db.events.findUnique({
            where:{
                id:input.id
            }
        })
        return event
    } catch (error) {
       throw new TRPCError({
        message:"Cannot find event",
        code:"INTERNAL_SERVER_ERROR"
       }) 
    }
})