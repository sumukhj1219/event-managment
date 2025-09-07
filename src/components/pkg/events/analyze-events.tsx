"use client"
import React from "react"
import { api } from "~/trpc/react"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"

const AnalyzeEvents = () => {
  const { data, isLoading } = api.eventsRouter.analyzeRouter.useQuery()
  const { data: students } = api.studentsRouter.totalRegisteredStudents.useQuery()

  if (isLoading) return <p className="text-center mt-10">Loading analysis...</p>

  return (
    <div className="max-w-6xl w-full flex flex-col items-center justify-center mx-auto p-4 space-y-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.totalEvents || 0}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Total Registered Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.totalRegisteredStudents || 0}</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {data?.averageAttendance?.toFixed(2) || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registered Students Table */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SRN</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Event</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.srn}</TableCell>
                <TableCell>{student.college}</TableCell>
                <TableCell>{student.event?.name || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AnalyzeEvents
