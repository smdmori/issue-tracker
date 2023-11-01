import prisma from "@/prisma/client"
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"

const IssueComments = async ({ issueId }: { issueId: number }) => {
  const issueComments = await prisma.comment.findMany({
    where: {
      issueId,
    },
    include: { User: true }
  })

  if (!issueComments.length) return null

  return (
    <Box mt={'4'} >
      <Text className="text-lg font-extrabold">Comments:</Text>
      <Card className="prose" mt={"2"}>
        <Flex direction={"column"} gap={"4"}>
          {
            issueComments.map(comment => {
              return (
                <Flex gap={"2"} align={"center"} key={comment.id}>
                  <Avatar src={comment.User?.image!} fallback={"?"} radius="full" size={"2"} />
                  <Text className="text-sm text-gray-500">{comment.text}</Text>
                </Flex>
              )
            })
          }
        </Flex>
      </Card>
    </Box>
  )
}

export default IssueComments