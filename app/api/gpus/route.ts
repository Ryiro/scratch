import { prisma } from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const gpus = await prisma.product.findMany({
      where: {
        category: "GPU", // Change to uppercase to match the database
      },
      include: {
        gpu: true,
      },
    });
    
    // Add debug log
    console.log('Found GPUs:', gpus.length);
    
    return NextResponse.json(gpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    return NextResponse.json(
      { error: "Failed to fetch GPUs" }, 
      { status: 500 }
    );
  }
}
