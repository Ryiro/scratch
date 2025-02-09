import { prisma } from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await req.json();
    console.log("Updating product:", id, "with:", updates);

    if (updates.count !== undefined) {
      updates.count = Number(updates.count);
    }

    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updates,
        count: updates.count,
        inStock: updates.count > 0
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

    return Response.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      { error: "Failed to update product: " + (error as Error).message },
      { status: 500 }
    );
  }
}
