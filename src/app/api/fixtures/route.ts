import { NextResponse } from "next/server";
import { getSouthwellFixtures } from "@/lib/rfu";

export const revalidate = 3600;

export async function GET() {
  try {
    const fixtures = await getSouthwellFixtures();
    return NextResponse.json({ fixtures, source: "rfu-api" });
  } catch (error) {
    return NextResponse.json(
      { fixtures: [], source: "error", error: String(error) },
      { status: 200 } // Return 200 with empty so client can gracefully fall back
    );
  }
}
