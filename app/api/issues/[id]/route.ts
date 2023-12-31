import {patchIssueSchema} from "@/app/validationSchema";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, {status: 401});

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {status: 400});
  }

  const {assignedToUserId, title, description, status} = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {id: assignedToUserId},
    });

    if (!user) return NextResponse.json({error: "Invalid user"}, {status: 400});
  }

  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)},
  });

  if (!issue) {
    return NextResponse.json({error: "Invalid issue"}, {status: 404});
  }

  const updatedIssue = await prisma.issue.update({
    where: {id: issue.id},
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  if (body.comment) {
    const newComment = await prisma.comment.create({
      data: {
        text: body.comment,
        issueId: updatedIssue.id,
        userEmail: session.user?.email,
        userId: user?.id,
      },
    });

    return NextResponse.json([updatedIssue, newComment]);
  }

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, {status: 401});

  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)},
  });

  if (!issue) {
    return NextResponse.json({error: "Invalid issue"}, {status: 404});
  }

  const deletedIssue = await prisma.issue.delete({
    where: {id: issue.id},
  });

  return NextResponse.json(deletedIssue);
}
