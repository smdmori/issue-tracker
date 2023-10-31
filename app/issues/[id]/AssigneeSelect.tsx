'use client'

import { Skeleton } from '@/app/components'
import { Issue } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import useUsers from '../_components/useUsers'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter()
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton height={'2rem'} />
  if (error) return null

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null, status: userId ? 'IN_PROGRESS' : issue.status })
      router.refresh()
    } catch (error) {
      toast.error('Changes could not be saved')
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=''>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item
                key={user.id}
                value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>

      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect