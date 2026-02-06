import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const props = await prisma.propBet.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(props);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, topic, choiceA, choiceB } = body as {
    id: number;
    topic: string;
    choiceA: string;
    choiceB: string;
  };

  if (!id || !topic?.trim() || !choiceA?.trim() || !choiceB?.trim()) {
    return NextResponse.json(
      { error: "id, topic, choiceA, and choiceB are all required" },
      { status: 400 }
    );
  }

  const updated = await prisma.propBet.update({
    where: { id },
    data: { topic: topic.trim(), choiceA: choiceA.trim(), choiceB: choiceB.trim() },
  });

  return NextResponse.json(updated);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { props } = body as {
    props: { topic: string; choiceA: string; choiceB: string }[];
  };

  if (!Array.isArray(props) || props.length === 0) {
    return NextResponse.json(
      { error: "props must be a non-empty array" },
      { status: 400 }
    );
  }

  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (!p.topic?.trim() || !p.choiceA?.trim() || !p.choiceB?.trim()) {
      return NextResponse.json(
        { error: `Item ${i + 1} is missing topic, choiceA, or choiceB` },
        { status: 400 }
      );
    }
  }

  // Delete all existing prop bets (cascades to picks and answer keys via FK)
  // Delete in order: picks, answer keys, then prop bets
  await prisma.pick.deleteMany();
  await prisma.answerKey.deleteMany();
  await prisma.propBet.deleteMany();

  // Create new prop bets
  const created = [];
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    const propBet = await prisma.propBet.create({
      data: {
        topic: p.topic.trim(),
        choiceA: p.choiceA.trim(),
        choiceB: p.choiceB.trim(),
        order: i + 1,
      },
    });
    created.push(propBet);
  }

  return NextResponse.json(created, { status: 201 });
}
