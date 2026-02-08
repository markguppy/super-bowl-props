import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const entry = await prisma.entry.findUnique({
    where: { id },
    include: {
      picks: {
        include: { propBet: true },
        orderBy: { propBet: { order: "asc" } },
      },
    },
  });

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  const answerKeys = await prisma.answerKey.findMany();
  const answers: Record<number, string> = {};
  for (const ak of answerKeys) {
    answers[ak.propBetId] = ak.correctChoice;
  }

  return NextResponse.json({ entry, answers });
}
