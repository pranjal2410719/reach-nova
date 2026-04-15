import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUser } from "@/lib/server/auth";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: { userId: auth.userId },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            organization: true,
            category: true,
            status: true,
            location: true,
            deadline: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Get user applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}