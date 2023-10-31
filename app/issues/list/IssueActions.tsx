import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssuePageSize from './IssuePageSize'
import IssueStatusFilter from './IssueStatusFilter'
import IssueUserSelect from './IssueUserSelect'

const IssueActions = () => {
  return (
    <Flex justify={'between'}>
      <Flex gap={'1'}>
        <IssueStatusFilter />
        <IssuePageSize />
        <IssueUserSelect />
      </Flex>
      <Link href={'/issues/new'}>
        <Button>
          New Issue
        </Button>
      </Link>
    </Flex>
  )
}

export default IssueActions