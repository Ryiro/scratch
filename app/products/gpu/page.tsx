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

interface GPU {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  image: string;
  gpu?: {
    memory: number;
    coreClock: number;
    boostClock: number;
    TDP: number;
  };
}

export default function GPUPage() {
  const [gpus, setGpus] = useState<GPU[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 300000]); // Higher range for GPUs
  const [filters, setFilters] = useState({
    manufacturers: new Set<string>(),
    memorySize: new Set<number>(),
    tdpRange: new Set<string>(),
  });
  const [sortBy, setSortBy] = useState<string>("featured");

  // Add function to toggle filters
  const toggleFilter = (type: keyof typeof filters, value: string | number) => {
    setFilters((prev) => {
      const newSet = new Set<string | number>(
        prev[type] as Set<string | number>
      );
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { ...prev, [type]: newSet };
    });
  };

  useEffect(() => {
    async function loadGPUs() {
      try {
        const response = await fetch("/api/gpus", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Loaded GPUs:", data); // Debug log
        setGpus(data);
      } catch (error) {
        console.error("Error loading GPUs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGPUs();
  }, []);

  if (loading) return <div>Loading...</div>;

  const filteredGPUs = gpus
    .filter((gpu) => {
      // Price filter
      if (gpu.price < priceRange[0] || gpu.price > priceRange[1]) return false;

      // Manufacturer filter
      if (
        filters.manufacturers.size > 0 &&
        !filters.manufacturers.has(gpu.manufacturer)
      )
        return false;

      // Memory size filter
      if (
        filters.memorySize.size > 0 &&
        gpu.gpu?.memory &&
        !filters.memorySize.has(gpu.gpu.memory)
      )
        return false;

      // TDP Range filter
      if (filters.tdpRange.size > 0 && gpu.gpu?.TDP) {
        const tdpRange =
          gpu.gpu.TDP < 150 ? "Low" : gpu.gpu.TDP < 250 ? "Medium" : "High";
        if (!filters.tdpRange.has(tdpRange)) return false;
      }

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
        case "memory-desc":
          return (b.gpu?.memory || 0) - (a.gpu?.memory || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Graphics Cards</h1>

      <div className="flex gap-8">
        {/* Left Side - Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-lg p-6 border">
            <h2 className="font-semibold mb-4 text-lg">Filters</h2>

            {/* Manufacturer Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Manufacturer</h3>
              <div className="space-y-2">
                {["NVIDIA", "AMD", "Intel"].map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.manufacturers.has(brand)}
                      onChange={() => toggleFilter("manufacturers", brand)}
                      className="rounded"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Memory Size Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Memory Size</h3>
              <div className="space-y-2">
                {[4, 6, 8, 10, 12, 16].map((size) => (
                  <label key={size} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.memorySize.has(size)}
                      onChange={() => toggleFilter("memorySize", size)}
                      className="rounded"
                    />
                    <span>{size}GB</span>
                  </label>
                ))}
              </div>
            </div>

            {/* TDP Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Power Consumption</h3>
              <div className="space-y-2">
                {["Low", "Medium", "High"].map((range) => (
                  <label key={range} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.tdpRange.has(range)}
                      onChange={() => toggleFilter("tdpRange", range)}
                      className="rounded"
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <Slider
                defaultValue={[0, 300000]}
                max={300000}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Products Grid */}
        <div className="flex-1">
          {/* Add Sorting Options */}
          <div className="mb-6 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Showing {filteredGPUs.length} products
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
                <SelectItem value="memory-desc">Memory: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Existing Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGPUs.map((gpu) => (
              <Link href={`/products/gpu/${gpu.id}`} key={gpu.id}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative w-full h-48">
                      <Image
                        src={gpu.image || "/placeholder.png"}
                        alt={gpu.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardTitle>{gpu.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">₹{gpu.price}</p>
                      <p className="text-muted-foreground">
                        {gpu.manufacturer}
                      </p>
                      {gpu.gpu && (
                        <div className="text-sm space-y-1">
                          <p>Memory: {gpu.gpu.memory}GB</p>
                          <p>Core Clock: {gpu.gpu.coreClock}MHz</p>
                          <p>TDP: {gpu.gpu.TDP}W</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
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
