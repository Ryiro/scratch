import { useState } from "react";
import type { Product } from "@prisma/client";

interface EditProductProps {
  product: Product;
  onUpdated?: (updatedProduct: Product) => void;
}

export default function EditProduct({ product, onUpdated }: EditProductProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(product.count || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name, price, count };
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        if (onUpdated) {
          onUpdated(updated);
        }
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Count</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
