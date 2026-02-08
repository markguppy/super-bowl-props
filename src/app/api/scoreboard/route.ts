import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const answerKeys = await prisma.answerKey.findMany();

  if (answerKeys.length === 0) {
    return NextResponse.json({
      message: "Answer key not yet submitted",
      scores: [],
    });
  }

  const answerMap = new Map(
    answerKeys.map((a) => [a.propBetId, a.correctChoice])
  );

  const tiebreakerAnswer = await prisma.tiebreakerAnswer.findUnique({
    where: { id: 1 },
  });

  const entries = await prisma.entry.findMany({
    include: { picks: true },
  });

  const scores = entries
    .map((entry) => {
      const score = entry.picks.reduce((count, pick) => {
        const correct = answerMap.get(pick.propBetId);
        return count + (pick.selection === correct ? 1 : 0);
      }, 0);

      const tiebreakerDiff = tiebreakerAnswer
        ? Math.abs(entry.tiebreaker - tiebreakerAnswer.correctTotal)
        : null;

      return {
        id: entry.id,
        playerName: entry.playerName,
        score,
        total: answerKeys.length,
        tiebreaker: entry.tiebreaker,
        tiebreakerDiff,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.tiebreakerDiff != null && b.tiebreakerDiff != null) {
        return a.tiebreakerDiff - b.tiebreakerDiff;
      }
      return 0;
    });

  return NextResponse.json({ scores });
}
