"use client"

import React, { useState } from "react"
import Link from "next/link"
import { api } from "~/trpc/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Calendar, Tag, UserPlus } from "lucide-react"

const GetEvents = () => {
  const { data: events, isLoading } = api.eventsRouter.getEventsRouter.useQuery()
  const [search, setSearch] = useState("")

  const filteredEvents = events?.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl p-4 w-full flex flex-col items-center justify-center mx-auto space-y-6">
      
      {/* Header + Create Event Button */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between bg-primary text-primary-foreground p-4 rounded-xl gap-4">
        <h1 className="text-2xl font-bold">Available Events</h1>
        <Link href="/admin">
          <Button variant="secondary">Create Event</Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="w-full">
        <Input
          placeholder="Search events by name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {isLoading && <p className="text-center col-span-3">Loading events...</p>}

        {!isLoading && filteredEvents?.length === 0 && (
          <p className="text-center col-span-3">No events found</p>
        )}

        {filteredEvents?.map((event) => (
          <Card key={event.id} className="shadow-md hover:shadow-lg transition rounded-xl flex flex-col justify-between">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2">
                <Tag size={18} /> {event.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm">
                <Calendar size={16} /> {new Date(event.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <p className="text-xs text-muted-foreground mb-4">
                Type: <span className="font-medium">{event.type}</span>
              </p>

              {/* Register Link */}
              <Link href={`/register/${event.id}`} className="self-end">
                <Button variant="secondary" size="sm">
                  <UserPlus size={16} className="mr-1" /> Register
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GetEvents
