import { authOptions } from "@/lib/auth";
import { getVIPProgress } from "@/lib/vip-utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/student/vip-status - Get student's VIP status and progress
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Only students can check VIP status" }, { status: 403 });
    }

    const vipProgress = await getVIPProgress(session.user.id);

    if (!vipProgress) {
      return NextResponse.json({ error: "Unable to fetch VIP progress" }, { status: 500 });
    }

    return NextResponse.json(vipProgress);

  } catch (error) {
    console.error("Error fetching VIP status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
