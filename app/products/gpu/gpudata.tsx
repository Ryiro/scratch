//

import { prisma } from "@/lib/prisma";

// Make this an API route instead of a direct function
export async function GET() {
  try {
    const gpus = await prisma.product.findMany({
      where: {
        category: "GPU",
      },
      include: {
        cpu: true,
      },
    });
    return Response.json(gpus);
  } catch {
    return Response.json({ error: "Failed to fetch GPUs" }, { status: 500 });
  }
}
