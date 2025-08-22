import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Only allow admin to approve courses
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const course = await prisma.course.update({
      where: { id: params.id },
      data: { isApproved: true }
    });
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve course" }, { status: 500 });
  }
}