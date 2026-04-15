import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUser } from "@/lib/server/auth";
import { applicationSchema } from "@/lib/server/validation/schemas";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (auth.role !== "INFLUENCER") {
      return NextResponse.json(
        { error: "Only influencers can apply" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = applicationSchema.parse(body);

    const campaign = await prisma.campaign.findUnique({
      where: { id: parsed.campaignId },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    if (campaign.status !== "OPEN") {
      return NextResponse.json(
        { error: "Campaign is not open for applications" },
        { status: 400 }
      );
    }

    const existing = await prisma.application.findFirst({
      where: {
        userId: auth.userId,
        campaignId: parsed.campaignId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied to this campaign" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: auth.userId,
        campaignId: parsed.campaignId,
        message: parsed.message,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Create application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}