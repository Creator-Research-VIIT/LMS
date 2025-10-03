import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  // Only allow admin to approve courses
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const course = await prisma.course.update({
      where: { id: id },
      data: { approvalStatus: "APPROVED" }
    });
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error('Error approving course:', error);
    return NextResponse.json({ error: "Failed to approve course" }, { status: 500 });
  }
}