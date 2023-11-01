import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "../../validationSchema";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, {status: 401});

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {status: 400});
  }

  const newIssue = await prisma.issue.create({
    data: {title: body.title, description: body.description},
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
        issueId: newIssue.id,
        userEmail: session.user?.email,
        userId: user?.id,
      },
    });

    return NextResponse.json([newIssue, newComment], {status: 201});
  }

  return NextResponse.json(newIssue, {status: 201});
}
