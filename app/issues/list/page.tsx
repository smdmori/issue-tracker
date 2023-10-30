import Pagination from "@/app/components/Pagination"
import prisma from "@/prisma/client"
import { Issue, Status } from "@prisma/client"
import { Flex } from '@radix-ui/themes'
import { Metadata } from "next"
import IssueActions from "./IssueActions"
import IssueTable, { columnNames } from "./IssueTable"

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  sortOrder: 'asc' | 'desc'
  pageSize: string
  page: string
}

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder }
    : undefined
  const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = parseInt(searchParams.pageSize) || 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable searchParams={{
        status: searchParams.status,
        orderBy: searchParams.orderBy,
        sortOrder: searchParams.sortOrder,
        pageSize: searchParams.pageSize,
        page: page.toString(),
      }} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}

export const dynamic = "force-dynamic";

export default IssuesPage