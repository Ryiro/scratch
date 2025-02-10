import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        cpu: true,
        gpu: true,
        memory: true,
        storage: true,
        motherboard: true,
        cooler: true,
        powersupply: true,
        case: true,
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
