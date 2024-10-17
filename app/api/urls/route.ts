import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
        orderBy: {createdAt:'desc'},
        take: 5
    });
    return NextResponse.json(urls)
  } catch (error) {
    console.log('Error fetching urls || '+ error);
    return NextResponse.json({ error: 'Internal server Error' },{ status: 500} )
  }
}
