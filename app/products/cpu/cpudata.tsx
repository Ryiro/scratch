import { prisma } from "@/lib/prisma";

// Make this an API route instead of a direct function
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
    return Response.json(cpus);
  } catch {
    return Response.json({ error: "Failed to fetch CPUs" }, { status: 500 });
  }
}
