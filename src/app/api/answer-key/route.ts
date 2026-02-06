import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { answers } = body as {
    answers: { propBetId: number; correctChoice: string }[];
  };

  if (!answers || answers.length !== 25) {
    return NextResponse.json(
      { error: "All 25 answers are required" },
      { status: 400 }
    );
  }

  // Upsert each answer
  for (const answer of answers) {
    await prisma.answerKey.upsert({
      where: { propBetId: answer.propBetId },
      update: { correctChoice: answer.correctChoice },
      create: {
        propBetId: answer.propBetId,
        correctChoice: answer.correctChoice,
      },
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const answers = await prisma.answerKey.findMany({
    include: { propBet: true },
    orderBy: { propBet: { order: "asc" } },
  });
  return NextResponse.json(answers);
}
