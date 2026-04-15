import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { getAuthUser } from "@/lib/server/auth";
import { applicationUpdateSchema } from "@/lib/server/validation/schemas";

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
    const parsed = applicationUpdateSchema.parse(body);

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        campaign: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.campaign.createdById !== auth.userId && auth.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Not authorized to update this application" },
        { status: 403 }
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status: parsed.status },
    });

    return NextResponse.json({ application: updated });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Update application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}