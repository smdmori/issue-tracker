'use client'

import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import useUsers from "../_components/useUsers"

const IssueUserSelect = () => {
  const { data: users } = useUsers()
  const router = useRouter()
  const searchParams = useSearchParams()

  const filterUser = (userId: string) => {
    const params = new URLSearchParams(searchParams)
    if (userId) params.set('userId', userId)
    else params.delete('userId')
    params.delete('page')

    const query = params.size ? '?' + params.toString() : ''
    router.push('/issues/list' + query)
  }

  return (
    <Select.Root
      onValueChange={filterUser}
    >
      <Select.Trigger placeholder="Filter by Assignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Item value={''}>
            <Select.Label>Clear Selection</Select.Label>
          </Select.Item>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default IssueUserSelect