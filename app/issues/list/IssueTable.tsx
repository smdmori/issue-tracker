import { Issue } from "@prisma/client"
import { Flex, Table } from "@radix-ui/themes"
import NextLink from "next/link"
import { IssueStatusBadge, Link } from "../../components"
import { IssueQuery } from "./page"
import { BiCaretDown, BiCaretUp } from "react-icons/bi"

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface" className="mt-5">
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
                    }}><BiCaretUp className={`inline ${searchParams.sortOrder === 'asc' ? 'text-gray-800' : 'text-gray-400'}`} /></NextLink>
                    <NextLink href={{
                      query: { ...searchParams, orderBy: column.value, sortOrder: 'desc' }
                    }}><BiCaretDown className={`inline ${searchParams.sortOrder === 'desc' ? 'text-gray-800' : 'text-gray-400'}`} /></NextLink>
                  </Flex>
                ) :
                  searchParams.orderBy === undefined &&
                  column.value === 'createdAt' && (
                    <Flex direction={'column'}>
                      <NextLink href={{
                        query: { ...searchParams, orderBy: column.value, sortOrder: 'asc' }
                      }}><BiCaretUp className={'inline text-gray-800'} /></NextLink>
                      <NextLink href={{
                        query: { ...searchParams, orderBy: column.value, sortOrder: 'desc' }
                      }}><BiCaretDown className={`inline ${searchParams.sortOrder === 'desc' ? 'text-gray-800' : 'text-gray-400'}`} /></NextLink>
                    </Flex>
                  )
                }
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
  { label: 'Issue', value: "title" },
  { label: 'Status', value: "status", className: "hidden md:table-cell" },
  { label: 'Created', value: "createdAt", className: "hidden md:table-cell" },
]
export const columnNames = columns.map(column => column.value)

export default IssueTable