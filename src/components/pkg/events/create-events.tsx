"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { User, Plus } from "lucide-react"
import { api } from "~/trpc/react"
import Link from "next/link"

const CreateEvents: React.FC = () => {
    const { data: session } = useSession()
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")

    const isAdmin = session?.user?.role === "ADMIN"

    const { mutate: createEvent, isPending } = api.eventsRouter.createRouter.useMutation({
        onSuccess: () => {
            alert("Event created successfully!")
            setName("")
            setDate("")
            setType("")
            setDescription("")
        },
        onError: (err) => {
            alert(`Error creating event: ${err.message}`)
        },
    })

    const handleSubmit = () => {
        createEvent({ name, type, description, date })
    }

    return (
        <div className="max-w-6xl w-full flex flex-col items-center justify-center mx-auto space-y-8 py-10">

            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl font-semibold">
                    Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
                </h1>

                <div className="flex gap-2">
                    <Link href="/analyze">
                        <Button variant="secondary">Analyze Events</Button>
                    </Link>
                </div>
            </div>


            <Card className="w-full bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus size={20} /> Create New Event
                    </CardTitle>
                    <CardDescription>
                        Easily add a new event to your platform. Fill in the event details and publish for everyone to see.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">

                    <div className="flex flex-col gap-4">
                        <div className="grid w-full max-w-sm gap-1.5">
                            <Label htmlFor="eventName">Event Name</Label>
                            <Input
                                id="eventName"
                                placeholder="Enter event name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w-sm gap-1.5">
                            <Label htmlFor="eventType">Event Type</Label>
                            <Input
                                id="eventType"
                                placeholder="Enter event type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w-sm gap-1.5">
                            <Label htmlFor="eventDate">Event Date</Label>
                            <Input
                                id="eventDate"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w-sm gap-1.5">
                            <Label htmlFor="eventDescription">Description</Label>
                            <Input
                                id="eventDescription"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Button
                            variant="secondary"
                            className="w-full mt-2"
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? "Creating..." : "Create Event"}
                        </Button>
                    </div>

                    {isAdmin && session?.user && (
                        <Card className="bg-secondary/10 p-4 flex flex-col items-center justify-start gap-4">
                            <img
                                src={session.user.image || "/default-avatar.png"}
                                alt="Admin"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div className="text-center space-y-1">
                                <p className="font-semibold">{session.user.name}</p>
                                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                <p className="text-sm font-medium">Role: ADMIN</p>
                            </div>
                        </Card>
                    )}

                </CardContent>
            </Card>
        </div>
    )
}

export default CreateEvents
