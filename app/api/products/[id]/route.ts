import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: unknown): Promise<Response> {
  const { params } = context as { params: { id: string } };
  
  if (!params.id) {
    return new Response(JSON.stringify({ error: "Invalid product ID" }), { status: 400 });
  }

  const data = await request.json(); // Directly using the request payload

  try {
    console.log("PATCH payload for product", params.id, data);
    const product = await prisma.product.update({
      where: { id: params.id },
      data, // Replicating same table update
      select: {
        id: true,
        count: true,
        inStock: true,
        name: true,
        price: true,
        manufacturer: true,
        image: true,
      },
    });
    return new Response(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Detailed update error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to update product",
        details: error instanceof Error ? error.message : error
      }),
      { status: 500 }
    );
  }
}
