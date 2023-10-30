'use client'

import { Issue, Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

const statuses: { label: string, value: Status }[] = [
  { label: 'Open', value: "OPEN" },
  { label: 'In Progress', value: "IN_PROGRESS" },
  { label: 'Closed', value: "CLOSED" }
]

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter()


  const changeStatus = async (issueStatus: Status) => {
    try {
      await axios.patch('/api/issues/' + issue.id, { status: issueStatus })
      router.refresh()
    } catch (error) {
      toast.error('Changes could not be saved')
    }
  }

  return (
    <>
      <Select.Root
        onValueChange={changeStatus}
      >
        <Select.Trigger placeholder="Change Status..." />
        <Select.Content>
          <Select.Group>
            {statuses.map(status => (
              <Select.Item key={status.label} value={status.value} >
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default StatusSelect