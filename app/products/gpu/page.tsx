import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function GPUPage() {
  const gpus = await prisma.product.findMany({
    where: {
      category: "GPU",
    },
    include: {
      gpu: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Graphics Cards</h1>

      {/* GPU-specific filters */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          {/* Add GPU-specific filters */}
          <div>Memory Size</div>
          <div>Memory Type</div>
          <div>Power Requirements</div>
          <div>Ray Tracing</div>
        </div>
      </div>

      {/* GPU listing with specific layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpus.map((gpu) => (
          <Link href={`/products/gpu/${gpu.id}`} key={gpu.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={gpu.image || "/default-image.png"}
                    alt={gpu.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <CardTitle>{gpu.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">${gpu.price}</p>
                  <p className="text-muted-foreground">{gpu.manufacturer}</p>
                  {gpu.gpu && (
                    <div className="text-sm space-y-1">
                      <p>Memory: {gpu.gpu.memory}GB</p>
                      <p>Core Clock: {gpu.gpu.coreClock}MHz</p>
                      <p>TDP: {gpu.gpu.TDP}W</p>
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
