import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function MemoryPage() {
  const memories = await prisma.product.findMany({
    where: {
      category: "RAM", // Keep this as RAM for database consistency
    },
    include: {
      memory: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Memory (DDR4/DDR5)</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>Capacity</div>
          <div>Speed</div>
          <div>Latency</div>
          <div>Memory Type</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Link href={`/products/memory/${memory.id}`} key={memory.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={memory.image || "/default-image.png"}
                    alt={memory.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <CardTitle>{memory.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">${memory.price}</p>
                  <p className="text-muted-foreground">{memory.manufacturer}</p>
                  {memory.memory && (
                    <div className="text-sm space-y-1">
                      <p>Speed: {memory.memory.speed}</p>
                      <p>Modules: {memory.memory.modules}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
