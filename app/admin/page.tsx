"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { createProduct } from "@/app/actions/create-product";
import { CPUForm } from "./components/cpu-form";
import { GPUForm } from "./components/gpu-form";
import { RAMForm } from "./components/ram-form";
import { StorageForm } from "./components/storage-form";
import { MotherboardForm } from "./components/motherboard-form";
import { CoolerForm } from "./components/cooler-form";
import { PowerSupplyForm } from "./components/powersupply-form";
import { CaseForm } from "./components/case-form";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, PackageIcon, UserIcon } from "lucide-react"; // Add these imports
import { ScrollArea } from "@/components/ui/scroll-area";

interface StockUpdatePayload {
  count: number;
  inStock: boolean;
}

interface ApiResponse {
  id: string;
  count: number;
  inStock: boolean;
  // ...other product fields
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name required" }),
  price: z.string().min(1, { message: "Price required" }),
  count: z.number().min(0, { message: "Stock count must be 0 or greater" }), // Changed from stockCount
  type: z.enum([
    "CPU",
    "GPU",
    "RAM",
    "STORAGE",
    "MOTHERBOARD",
    "COOLER",
    "POWERSUPPLY",
    "CASE",
  ]),
});

export default function AdminPage() {
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageUploadRef = useRef<{ resizedImage: string | null }>({
    resizedImage: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [addCount, setAddCount] = useState<number>(0);
  const [removeCount, setRemoveCount] = useState<number>(0);

  interface Product {
    id: string;
    name: string;
    manufacturer: string;
    price: number;
    image?: string;
    inStock: boolean;
    count?: number;
    category: string;
    // removed description field
  }

  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      price: "",
      count: 0, // Changed from stockCount
    },
  });

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new globalThis.Image(); // Fix: Use globalThis.Image instead of Image
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > 500) {
              height = Math.round((height * 500) / width);
              width = 500;
            }
          } else {
            if (height > 500) {
              width = Math.round((width * 500) / height);
              height = 500;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedFile) {
      setImageError("Please select a product image");
      return;
    }
    setImageError(null);

    try {
      setUploading(true);
      const slug = values.name.toLowerCase().replace(/\s+/g, "-");

      // Handle image upload if file is selected
      if (selectedFile) {
        const resizedImageData = await resizeImage(selectedFile);
        imageUploadRef.current.resizedImage = resizedImageData;

        const formData = new FormData();
        formData.append(
          "file",
          new File([selectedFile], `${slug}.png`, { type: selectedFile.type })
        );
        formData.append("resizedImage", resizedImageData);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error("Upload failed");
      }

      // Create product with image path and stock info
      const formData = {
        ...values,
        image: `/images/${slug}.png`,
        inStock: values.count > 0, // Automatically set based on stock count
        ...form.getValues(),
      };

      const result = await createProduct(formData);

      if (result.success) {
        form.reset();
        setSelectedType(undefined);
        setSelectedFile(null);
        alert("Product created successfully!");
      } else {
        alert("Failed to create product: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while creating the product");
    } finally {
      setUploading(false);
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleProductSelect = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling
    console.log("Selected product:", product); // Debug log
    setSelectedProduct(product);
    setEditedProduct({}); // Reset edited values
  };

  const handleProductEdit = (
    field: keyof Product,
    value: string | number | boolean | undefined
  ) => {
    if (field === "count") {
      const count = Number(value);
      setEditedProduct((prev) => ({
        ...prev,
        [field]: count,
        inStock: count > 0, // Automatically update inStock based on count
      }));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedProduct || Object.keys(editedProduct).length === 0) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();
      console.log("Product updated:", updatedProduct); // Debug log

      // Update the search results with the new data
      setSearchResults((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...editedProduct } : p
        )
      );

      // Show success message
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStockUpdate = async (type: "add" | "remove") => {
    if (!selectedProduct?.id) return;

    const currentCount = selectedProduct.count || 0;
    const newCount =
      type === "add"
        ? currentCount + addCount
        : Math.max(0, currentCount - removeCount);

    setIsSaving(true);
    try {
      const payload: StockUpdatePayload = {
        count: newCount,
        inStock: newCount > 0,
      };

      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update stock");

      const updatedProduct: ApiResponse = await response.json();

      // Update the search results
      setSearchResults((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );

      // Update selected product
      setSelectedProduct((prev) =>
        prev ? { ...prev, count: newCount, inStock: newCount > 0 } : null
      );

      // Reset inputs
      setAddCount(0);
      setRemoveCount(0);

      alert("Stock updated successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function cn(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="grid grid-cols-3 gap-8">
        {/* Column 1: Add New PC Part (existing form) */}
        <div className="col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <h1 className="text-2xl font-bold">Add New Product</h1>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Part Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter part name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Part Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedType(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select part type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CPU">CPU</SelectItem>
                            <SelectItem value="GPU">GPU</SelectItem>
                            <SelectItem value="RAM">RAM</SelectItem>
                            <SelectItem value="STORAGE">Storage</SelectItem>
                            <SelectItem value="MOTHERBOARD">
                              Motherboard
                            </SelectItem>
                            <SelectItem value="COOLER">Cooler</SelectItem>
                            <SelectItem value="POWERSUPPLY">
                              Power Supply
                            </SelectItem>
                            <SelectItem value="CASE">Case</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Count</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Enter stock count"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Card className="p-4">
                    <h3 className="text-lg font-medium mb-4">Product Image</h3>
                    <CardContent className="space-y-4 p-0">
                      <div className="grid gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        {imageError && (
                          <p className="text-sm text-destructive">
                            {imageError}
                          </p>
                        )}
                        {imagePreview && (
                          <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-lg border">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        {selectedFile && (
                          <p className="text-sm text-muted-foreground">
                            Selected: {selectedFile?.name}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedType && (
                    <div className="pt-6 border-t">
                      {selectedType === "CPU" && <CPUForm />}
                      {selectedType === "GPU" && <GPUForm />}
                      {selectedType === "RAM" && <RAMForm />}
                      {selectedType === "STORAGE" && <StorageForm />}
                      {selectedType === "MOTHERBOARD" && <MotherboardForm />}
                      {selectedType === "COOLER" && <CoolerForm />}
                      {selectedType === "POWERSUPPLY" && <PowerSupplyForm />}
                      {selectedType === "CASE" && <CaseForm />}
                    </div>
                  )}

                  <Button type="submit" disabled={uploading}>
                    {uploading ? "Creating Product..." : "Create Product"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Search Products */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Search Products</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {searching && <p>Searching...</p>}

                <div className="space-y-4">
                  {searchResults.map((product) => (
                    <Card
                      key={product.id}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedProduct?.id === product.id
                          ? "ring-2 ring-primary"
                          : "hover:bg-accent"
                      )}
                      onClick={(e) => handleProductSelect(product, e)} // Add event parameter
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20">
                            <Image
                              src={product.image || "/placeholder.png"}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.manufacturer}
                            </p>
                            <p className="text-sm">₹{product.price}</p>
                            <div className="mt-2">
                              <Badge
                                variant={
                                  (product.count ?? 0) > 0
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {(product.count ?? 0) > 0
                                  ? `${product.count} in stock`
                                  : "Out of Stock"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Editor */}
          {selectedProduct && (
            <Card className="mt-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-xl font-bold">
                  Edit {selectedProduct.name}
                </h3>
                <Button
                  onClick={handleSaveChanges}
                  disabled={isSaving || Object.keys(editedProduct).length === 0}
                >
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={editedProduct.name ?? selectedProduct.name}
                      onChange={(e) =>
                        handleProductEdit("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price</label>
                    <Input
                      type="number"
                      value={editedProduct.price ?? selectedProduct.price}
                      onChange={(e) =>
                        handleProductEdit("price", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="text-sm font-medium">Stock Management</div>

                  {/* Updated Stock Display */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Stock:</span>
                    <Badge
                      variant={
                        selectedProduct.count && selectedProduct.count > 0
                          ? "default"
                          : "destructive"
                      }
                    >
                      {selectedProduct.count && selectedProduct.count > 0
                        ? `${selectedProduct.count} units in stock`
                        : "Out of Stock"}
                    </Badge>
                  </div>

                  {/* Add Stock */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={addCount}
                      onChange={(e) =>
                        setAddCount(Math.max(0, parseInt(e.target.value) || 0))
                      }
                      placeholder="Amount to add"
                      className="w-32"
                    />
                    <Button
                      onClick={async () => {
                        await handleStockUpdate("add");
                        // Refresh search results after stock update
                        if (searchQuery) {
                          await handleSearch(searchQuery);
                        }
                      }}
                      disabled={addCount <= 0 || isSaving}
                      variant="outline"
                      size="sm"
                    >
                      Add Stock
                    </Button>
                  </div>

                  {/* Remove Stock */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={removeCount}
                      onChange={(e) =>
                        setRemoveCount(
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      placeholder="Amount to remove"
                      className="w-32"
                    />
                    <Button
                      onClick={async () => {
                        await handleStockUpdate("remove");
                        // Refresh search results after stock update
                        if (searchQuery) {
                          await handleSearch(searchQuery);
                        }
                      }}
                      disabled={removeCount <= 0 || isSaving}
                      variant="outline"
                      size="sm"
                    >
                      Remove Stock
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Column 3: User Dashboard */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Recent Orders</h2>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {/* Sample Order Card - This will be replaced with real data */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Order ID:
                            </span>
                          </div>
                          <span className="text-sm">#12345</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time:</span>
                          </div>
                          <span className="text-sm">2024-02-20 14:30</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium">Amount:</span>
                          <span className="text-sm font-bold">₹45,999</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Order ID:
                            </span>
                          </div>
                          <span className="text-sm">#12345</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time:</span>
                          </div>
                          <span className="text-sm">2024-02-20 14:30</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium">Amount:</span>
                          <span className="text-sm font-bold">₹45,999</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Order ID:
                            </span>
                          </div>
                          <span className="text-sm">#12345</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between"></div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Time:</span>
                        </div>
                        <span className="text-sm">2024-02-20 14:30</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Amount:</span>
                        <span className="text-sm font-bold">₹45,999</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Order ID:
                            </span>
                          </div>
                          <span className="text-sm">#12345</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time:</span>
                          </div>
                          <span className="text-sm">2024-02-20 14:30</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium">Amount:</span>
                          <span className="text-sm font-bold">₹45,999</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Order ID:
                            </span>
                          </div>
                          <span className="text-sm">#12345</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between"></div>
                        <div className="flex items-center gap-2"></div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Customer:
                            </span>
                          </div>
                          <span className="text-sm">John Doe</span>
                        </div>

                        <div className="flex items-center justify-between"></div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Time:</span>
                        </div>
                        <span className="text-sm">2024-02-20 14:30</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Amount:</span>
                        <span className="text-sm font-bold">₹45,999</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Add more sample cards with different data */}
                  {/* You can map through actual order data here later */}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
