import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, submissionsClosed: false },
  });
  return NextResponse.json({ submissionsClosed: settings.submissionsClosed });
}

export async function POST(request: NextRequest) {
  const auth = await getAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { submissionsClosed } = (await request.json()) as {
    submissionsClosed: boolean;
  };

  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: { submissionsClosed },
    create: { id: 1, submissionsClosed },
  });

  return NextResponse.json({ submissionsClosed: settings.submissionsClosed });
}
