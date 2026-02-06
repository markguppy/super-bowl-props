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

  const entries = await prisma.entry.findMany({
    include: { picks: true },
  });

  const scores = entries
    .map((entry) => {
      const score = entry.picks.reduce((count, pick) => {
        const correct = answerMap.get(pick.propBetId);
        return count + (pick.selection === correct ? 1 : 0);
      }, 0);

      return {
        id: entry.id,
        playerName: entry.playerName,
        score,
        total: 25,
      };
    })
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ scores });
}
