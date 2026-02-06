import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { playerName, picks } = body as {
    playerName: string;
    picks: { propBetId: number; selection: string }[];
  };

  if (!playerName || !picks || picks.length !== 25) {
    return NextResponse.json(
      { error: "Player name and 25 picks are required" },
      { status: 400 }
    );
  }

  const entry = await prisma.entry.create({
    data: {
      playerName,
      picks: {
        create: picks.map((p) => ({
          propBetId: p.propBetId,
          selection: p.selection,
        })),
      },
    },
    include: { picks: true },
  });

  return NextResponse.json(entry, { status: 201 });
}

export async function GET() {
  const entries = await prisma.entry.findMany({
    include: { picks: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}
