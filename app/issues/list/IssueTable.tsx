import { Issue } from "@prisma/client"
import { Avatar, Flex, Table, Text } from "@radix-ui/themes"
import NextLink from "next/link"
import { BiCaretDown, BiCaretUp } from "react-icons/bi"
import { IssueStatusBadge, Link } from "../../components"
import { IssueQuery } from "./page"

interface Props {
  searchParams: IssueQuery,
  issues: Issue[],
  assignedIssues: Issue[]
}

const IssueTable = async ({ searchParams, issues, assignedIssues }: Props) => {
  if (!issues.length || (issues.length && !assignedIssues.length)) {
    return <Text color="red" className="text-center">There is nothing to show!</Text>
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Flex align={"center"} gap={"2"} className="h-[inherit]">
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value, sortOrder: 'asc' }
                  }}
                >
                  {column.label}
                </NextLink>
                {searchParams.orderBy === column.value ? (
                  <Flex direction={'column'}>
                    <NextLink href={{
                      query: { ...searchParams, orderBy: column.value, sortOrder: 'asc' }
                    }}>
                      <BiCaretUp className={`inline ${searchParams.sortOrder === 'asc' ? 'text-gray-800' : 'text-gray-400'}`} />
                    </NextLink>

                    <NextLink href={{
                      query: { ...searchParams, orderBy: column.value, sortOrder: 'desc' }
                    }}>
                      <BiCaretDown className={`inline ${searchParams.sortOrder === 'desc' ? 'text-gray-800' : 'text-gray-400'}`} />
                    </NextLink>
                  </Flex>
                ) :
                  searchParams.orderBy === undefined &&
                  column.value === 'createdAt' && (
                    <Flex direction={'column'}>
                      <NextLink href={{
                        query: { ...searchParams, orderBy: column.value, sortOrder: 'asc' }
                      }}>
                        <BiCaretUp className={'inline text-gray-800'} />
                      </NextLink>

                      <NextLink href={{
                        query: { ...searchParams, orderBy: column.value, sortOrder: 'desc' }
                      }}>
                        <BiCaretDown className={`inline ${searchParams.sortOrder === 'desc' ? 'text-gray-800' : 'text-gray-400'}`} />
                      </NextLink>
                    </Flex>
                  )
                }
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* TODO: Find a better way to write this code */}
        {searchParams.userId ?
          assignedIssues.map(issue => table(issue, assignedIssues)) :
          issues.map(issue => (table(issue, assignedIssues)))}
      </Table.Body>
    </Table.Root>
  )
}

// TODO: use typescript to clean up this mess
function table(issue, allIssues) {
  return (
    <Table.Row key={issue.id} align={"center"}>
      <Table.Cell>
        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
        <div className="block md:hidden">
          <Flex justify={"between"}>
            <IssueStatusBadge status={issue.status} />
            {issue.assignedToUserId && <Avatar size={"2"} radius="full"
              src={allIssues.find(i => i.assignedToUserId === issue.assignedToUserId)?.assignedToUser?.image!} fallback={"?"} />}
          </Flex>
        </div>
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
      <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
      <Table.Cell className="hidden md:table-cell">{issue.assignedToUserId && <Avatar size={"2"} radius="full"
        src={allIssues.find(i => i.assignedToUserId === issue.assignedToUserId)?.assignedToUser?.image!} fallback={"?"} />}</Table.Cell>
    </Table.Row>
  )
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
  { label: 'Issue', value: "title" },
  { label: 'Status', value: "status", className: "hidden md:table-cell" },
  { label: 'Created', value: "createdAt", className: "hidden md:table-cell" },
  { label: 'Assignee', value: 'assignedToUserId', className: "hidden md:table-cell" }
]
export const columnNames = columns.map(column => column.value)

export default IssueTable