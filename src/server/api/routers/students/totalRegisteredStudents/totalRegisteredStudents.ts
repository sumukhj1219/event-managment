import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";

export const totalRegisteredStudents = protectedProcedure.query(async({ctx})=>{
    try {
        const students = await ctx.db.students.findMany({
            include:{
                event:true
            }
        })
        return students
    } catch (error) {
        throw new TRPCError({
            message:"Cannot fetch students",
            code:"INTERNAL_SERVER_ERROR"
        })
    }
})