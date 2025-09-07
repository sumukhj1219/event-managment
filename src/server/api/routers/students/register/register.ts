import { TRPCError } from "@trpc/server";
import z from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const registerRouter = protectedProcedure.input(
    z.object({
        name:z.string(),
        srn:z.string(),
        college:z.string(),
        eventId:z.string()
    })
).mutation(async({ctx, input})=>{
    try {
        await ctx.db.students.create({
            data:{
                name:input.name,
                srn:input.srn,
                college:input.college,
                eventId:input.eventId,
            }
        })
    } catch (error) {
        throw new TRPCError({
            message:"Unable to register student",
            code:"INTERNAL_SERVER_ERROR"
        })
    }
})