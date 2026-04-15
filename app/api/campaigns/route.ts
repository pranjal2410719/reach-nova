import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUser } from "@/lib/server/auth";
import { campaignFiltersSchema, campaignSchema } from "@/lib/server/validation/schemas";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = campaignFiltersSchema.parse(Object.fromEntries(searchParams));

    const where: any = {};

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.minBudget || filters.maxBudget) {
      where.budget = {};
      if (filters.minBudget) where.budget.gte = filters.minBudget;
      if (filters.maxBudget) where.budget.lte = filters.maxBudget;
    }

    const skip = (filters.page - 1) * filters.limit;

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: filters.limit,
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: { firstName: true, lastName: true },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns: campaigns.map((c) => ({
        id: c.id,
        title: c.title,
        organization: c.organization,
        category: c.category,
        status: c.status,
        location: c.location,
        deadline: c.deadline.toISOString(),
        description: c.description,
        budget: c.budget,
        eligibility: c.eligibility,
        contactInfo: c.contactInfo,
        createdBy: c.createdBy,
        applicationCount: c._count.applications,
      })),
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Get campaigns error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (auth.role !== "BRAND" && auth.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only brands can create campaigns" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = campaignSchema.parse(body);

    const campaign = await prisma.campaign.create({
      data: {
        ...parsed,
        deadline: new Date(parsed.deadline),
        createdById: auth.userId,
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}