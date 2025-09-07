"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { api } from "~/trpc/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

interface RegisterEventProps {
  id: string
}

const RegisterEvent: React.FC<RegisterEventProps> = ({ id }) => {
  const { data: session } = useSession()
  const { data: event, isLoading } = api.eventsRouter.getEventByIdRouter.useQuery({ id })

  const [name, setName] = useState("")
  const [srn, setSrn] = useState("")
  const [college, setCollege] = useState("")

  const {mutate:registerMutation,isPending} = api.studentsRouter.registerRouter.useMutation({
    onSuccess: () => {
      alert("Registered successfully!")
      setName("")
      setSrn("")
      setCollege("")
    },
    onError: (err) => {
      alert(`Registration failed: ${err.message}`)
    },
  })

  const handleSubmit = () => {
    if (!name || !srn || !college) {
      alert("Please fill all fields")
      return
    }
    registerMutation({ name, srn, college, eventId: id })
  }

  if (isLoading) return <p className="text-center">Loading event...</p>
  if (!event) return <p className="text-center">Event not found</p>

  return (
    <div className="max-w-5xl flex flex-col items-center justify-center mx-auto p-4 space-y-6">
      
      {/* Event Info */}
      <Card className="w-full bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{event.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{event.description}</p>
          <p className="text-xs mt-2 text-muted-foreground">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register for this Event</CardTitle>
          <CardDescription>Fill out the form below to register as a student</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-md gap-1.5">
            <Input
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md gap-1.5">
            <Input
              placeholder="SRN"
              value={srn}
              onChange={(e) => setSrn(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md gap-1.5">
            <Input
              placeholder="College"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterEvent
