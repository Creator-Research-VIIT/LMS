import { authOptions } from "@/lib/auth";
import { getVIPStats } from "@/lib/vip-utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/admin/vip-stats - Get VIP statistics
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const stats = await getVIPStats();

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Error fetching VIP stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
