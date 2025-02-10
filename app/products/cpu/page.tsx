"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wrench } from "lucide-react"; // Add these icons
import { useRouter } from "next/navigation";

// Add interface for CPU type
interface CPU {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  image: string;
  cpu?: {
    coreCount: number;
    coreClock: number;
    microarchitecture: string;
    socket: string;
  };
}

export default function CPUPage() {
  const [cpus, setCpus] = useState<CPU[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [filters, setFilters] = useState({
    manufacturers: new Set<string>(),
    coreCounts: new Set<number>(),
    sockets: new Set<string>(),
  });
  const [sortBy, setSortBy] = useState<string>("featured");
  const router = useRouter();

  // Add function to toggle filters
  const toggleFilter = (type: keyof typeof filters, value: string | number) => {
    setFilters((prev) => {
      const newSet = new Set(prev[type] as Set<string | number>);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return {
        ...prev,
        [type]: newSet,
      };
    });
  };

  useEffect(() => {
    async function loadCPUs() {
      try {
        const response = await fetch("/api/cpus", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCpus(data);
      } catch (error) {
        console.error("Error loading CPUs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCPUs();
  }, []);

  const filteredCPUs = cpus
    .filter((cpu) => {
      // Price filter
      if (cpu.price < priceRange[0] || cpu.price > priceRange[1]) return false;

      // Manufacturer filter - made case insensitive
      if (
        filters.manufacturers.size > 0 &&
        ![...filters.manufacturers].some(
          (m) => m.toLowerCase() === cpu.manufacturer.toLowerCase()
        )
      )
        return false;

      // Core count filter
      if (
        filters.coreCounts.size > 0 &&
        cpu.cpu?.coreCount !== undefined &&
        !filters.coreCounts.has(cpu.cpu.coreCount)
      )
        return false;

      // Socket filter
      if (
        filters.sockets.size > 0 &&
        cpu.cpu?.socket &&
        !filters.sockets.has(cpu.cpu.socket)
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "cores-desc":
          return (b.cpu?.coreCount || 0) - (a.cpu?.coreCount || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToBuild = async (e: React.MouseEvent, cpu: CPU) => {
    e.preventDefault(); // Prevent the link navigation
    e.stopPropagation(); // Stop event bubbling

    try {
      // Store CPU data in localStorage
      localStorage.setItem(
        "cpu",
        JSON.stringify({
          name: cpu.name,
          price: cpu.price,
          image: cpu.image,
          specs: {
            cores: cpu.cpu?.coreCount,
            clock: cpu.cpu?.coreClock,
            socket: cpu.cpu?.socket,
          },
        })
      );

      // Navigate to builder page
      await router.push("/builder");
    } catch (error) {
      console.error("Error adding to build:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Processors</h1>

      <div className="flex gap-8">
        {/* Left Side - Filters Panel */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-lg p-6 border">
            <h2 className="font-semibold mb-4 text-lg">Filters</h2>

            {/* Manufacturer Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Manufacturer</h3>
              <div className="space-y-2">
                {["AMD", "Intel"].map((manufacturer) => (
                  <label
                    key={manufacturer}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={[...filters.manufacturers].some(
                        (m) => m.toLowerCase() === manufacturer.toLowerCase()
                      )}
                      onChange={() =>
                        toggleFilter("manufacturers", manufacturer)
                      }
                      className="rounded"
                    />
                    <span>{manufacturer}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Core Count Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Core Count</h3>
              <div className="space-y-2">
                {[4, 6, 8, 12, 16].map((cores) => (
                  <label key={cores} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.coreCounts.has(cores)}
                      onChange={() => toggleFilter("coreCounts", cores)}
                      className="rounded"
                    />
                    <span>{cores} Cores</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Socket Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Socket</h3>
              <div className="space-y-2">
                {["AM4", "AM5", "LGA 1700", "LGA 1200"].map((socket) => (
                  <label key={socket} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.sockets.has(socket)}
                      onChange={() => toggleFilter("sockets", socket)}
                      className="rounded"
                    />
                    <span>{socket}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 100000]}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between items-center text-sm">
                  <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="flex-1">
          {/* Sorting Options */}
          <div className="mb-6 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Showing {filteredCPUs.length} products
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="cores-desc">
                  Core Count: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCPUs.map((cpu) => (
              <Link href={`/products/${cpu.id}`} key={cpu.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative w-full h-48">
                      <Image
                        src={cpu.image || "/path/to/default/image.jpg"}
                        alt={cpu.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <CardTitle>{cpu.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">₹{cpu.price}</p>
                      <p className="text-muted-foreground">
                        {cpu.manufacturer}
                      </p>
                      {cpu.cpu && (
                        <div className="text-sm space-y-1">
                          <p>Cores: {cpu.cpu.coreCount}</p>
                          <p>Base Clock: {cpu.cpu.coreClock}MHz</p>
                          <p>Architecture: {cpu.cpu.microarchitecture}</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => handleAddToBuild(e, cpu)}
                        >
                          <Wrench className="w-4 h-4 mr-2" />
                          Add to Build
                        </Button>
                        <Button variant="default" size="sm" className="flex-1">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
