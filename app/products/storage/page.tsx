import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function StoragePage() {
  const storages = await prisma.product.findMany({
    where: {
      category: "STORAGE",
    },
    include: {
      storage: true,
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Storage Drives</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="font-medium mb-4">Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>Type</div>
          <div>Capacity</div>
          <div>Interface</div>
          <div>Form Factor</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storages.map((storage) => (
          <Link href={`/products/storage/${storage.id}`} key={storage.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={storage.image || "/default-image.png"}
                    alt={storage.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <CardTitle>{storage.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">${storage.price}</p>
                  <p className="text-muted-foreground">
                    {storage.manufacturer}
                  </p>
                  {storage.storage && (
                    <div className="text-sm space-y-1">
                      <>
                        <p>Type: {storage.storage.type}</p>
                        <p>Capacity: {storage.storage.capacity}</p>
                        <p>Interface: {storage.storage.interface}</p>
                      </>
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
