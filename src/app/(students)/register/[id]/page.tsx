import React from "react"
import RegisterEvent from "~/components/pkg/events/register-event"

interface PageProps {
  params: {
    id: string
  }
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <RegisterEvent id={params.id} />
    </div>
  )
}

export default Page
