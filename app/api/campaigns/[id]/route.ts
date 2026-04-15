import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUser } from "@/lib/server/auth";
import { campaignSchema } from "@/lib/server/validation/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({
      campaign: {
        id: campaign.id,
        title: campaign.title,
        organization: campaign.organization,
        category: campaign.category,
        status: campaign.status,
        location: campaign.location,
        deadline: campaign.deadline.toISOString(),
        description: campaign.description,
        budget: campaign.budget,
        eligibility: campaign.eligibility,
        contactInfo: campaign.contactInfo,
        createdBy: campaign.createdBy,
        applicationCount: campaign._count.applications,
        createdAt: campaign.createdAt.toISOString(),
        updatedAt: campaign.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Get campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = campaignSchema.parse(body);

    const existing = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    if (existing.createdById !== auth.userId && auth.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Not authorized to update this campaign" },
        { status: 403 }
      );
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...parsed,
        deadline: new Date(parsed.deadline),
      },
    });

    return NextResponse.json({ campaign });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Update campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}