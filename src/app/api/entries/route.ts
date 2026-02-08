import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Check if submissions are closed
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (settings?.submissionsClosed) {
    return NextResponse.json(
      { error: "Submissions are closed." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { playerName, venmoUsername, picks, tiebreaker } = body as {
    playerName: string;
    venmoUsername: string;
    picks: { propBetId: number; selection: string }[];
    tiebreaker: number;
  };

  const propCount = await prisma.propBet.count();

  if (!playerName || !venmoUsername || !picks || picks.length !== propCount) {
    return NextResponse.json(
      { error: `Player name, Venmo username, and all ${propCount} picks are required` },
      { status: 400 }
    );
  }

  if (tiebreaker == null || !Number.isInteger(tiebreaker) || tiebreaker < 0) {
    return NextResponse.json(
      { error: "Tiebreaker must be a non-negative integer" },
      { status: 400 }
    );
  }

  const entry = await prisma.entry.create({
    data: {
      playerName,
      venmoUsername,
      tiebreaker,
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

export async function DELETE(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await request.json()) as { id: number };

  if (!id) {
    return NextResponse.json({ error: "Entry id is required" }, { status: 400 });
  }

  // Delete picks first (cascade), then the entry
  await prisma.pick.deleteMany({ where: { entryId: id } });
  await prisma.entry.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
