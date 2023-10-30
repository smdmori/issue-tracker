import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssuePageSize from './IssuePageSize'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
  return (
    <Flex justify={'between'}>
      <Flex gap={'1'}>
        <IssueStatusFilter />
        <IssuePageSize />
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