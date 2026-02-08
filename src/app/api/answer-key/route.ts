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
  const { answers, tiebreakerAnswer } = body as {
    answers: { propBetId: number; correctChoice: string }[];
    tiebreakerAnswer?: number;
  };

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json(
      { error: "answers array is required" },
      { status: 400 }
    );
  }

  const withChoice = answers.filter((a) => a.correctChoice);
  const withoutChoice = answers.filter((a) => !a.correctChoice);

  // Upsert answers that have a correctChoice
  for (const answer of withChoice) {
    await prisma.answerKey.upsert({
      where: { propBetId: answer.propBetId },
      update: { correctChoice: answer.correctChoice },
      create: {
        propBetId: answer.propBetId,
        correctChoice: answer.correctChoice,
      },
    });
  }

  // Delete answer key rows where admin cleared a previously-set answer
  for (const answer of withoutChoice) {
    await prisma.answerKey.deleteMany({
      where: { propBetId: answer.propBetId },
    });
  }

  // Upsert tiebreaker answer if provided
  if (tiebreakerAnswer != null) {
    await prisma.tiebreakerAnswer.upsert({
      where: { id: 1 },
      update: { correctTotal: tiebreakerAnswer },
      create: { id: 1, correctTotal: tiebreakerAnswer },
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const answers = await prisma.answerKey.findMany({
    include: { propBet: true },
    orderBy: { propBet: { order: "asc" } },
  });
  const tiebreaker = await prisma.tiebreakerAnswer.findUnique({
    where: { id: 1 },
  });
  return NextResponse.json({
    answers,
    tiebreakerAnswer: tiebreaker?.correctTotal ?? null,
  });
}
