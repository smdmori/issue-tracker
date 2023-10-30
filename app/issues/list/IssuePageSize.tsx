'use client'

import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const pageSizes = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
]

const IssuePageSize = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={
        searchParams.get('pageSize') || '10'
      }
      onValueChange={(pageSize) => {
        const params = new URLSearchParams(searchParams)
        params.set('pageSize', pageSize)

        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues/list' + query)
      }}
    >
      <Select.Trigger placeholder='Page Size...' />
      <Select.Content>
        {pageSizes.map(pageSize => (
          <Select.Item
            key={pageSize.label}
            value={pageSize.value.toString()}
          >
            {pageSize.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssuePageSize