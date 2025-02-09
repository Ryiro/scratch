import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cpus = await prisma.product.findMany({
      where: {
        category: "CPU",
      },
      include: {
        cpu: true,
      },
    });
    return NextResponse.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    return NextResponse.json(
      { error: "Failed to fetch CPUs" }, 
      { status: 500 }
    );
  }
}
