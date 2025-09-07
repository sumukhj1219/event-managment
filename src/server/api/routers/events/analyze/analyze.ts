import { TRPCError } from "@trpc/server"
import { protectedProcedure } from "~/server/api/trpc"

export const analyzeRouter = protectedProcedure.query(async ({ ctx }) => {
  try {
    const events = await ctx.db.events.findMany()
    const students = await ctx.db.students.findMany()

    const totalEvents = events.length
    const totalRegisteredStudents = students.length

    const averageAttendance =
      totalEvents > 0 ? totalRegisteredStudents / totalEvents : 0

    return {
      totalEvents,
      totalRegisteredStudents,
      averageAttendance,
    }
  } catch (error) {
    throw new TRPCError({
      message: "Cannot fetch analysis",
      code: "INTERNAL_SERVER_ERROR",
    })
  }
})
