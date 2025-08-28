import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      select: {
        id: true,
        name: true,
        email: true,
        approvalStatus: true,
        referralCode: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}
