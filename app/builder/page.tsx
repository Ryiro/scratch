"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  interface Component {
    name: string;
    image: string;
    price: number;
  }

  const [components, setComponents] = useState<Record<string, Component>>({});

  // Load all components from localStorage
  useEffect(() => {
    try {
      const componentKeys = [
        "cpu",
        "gpu",
        "motherboard",
        "memory",
        "storage",
        "case",
        "powersupply",
        "cooler",
      ];
      const loadedComponents: Record<string, Component> = {};

      componentKeys.forEach((key) => {
        const stored = localStorage.getItem(key);
        if (stored) {
          loadedComponents[key] = JSON.parse(stored);
        }
      });

      setComponents(loadedComponents);
    } catch (error) {
      console.error("Error loading components:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [randomUrl, setRandomUrl] = useState<string>("");

  useEffect(() => {
    // Generate a random URL for demonstration purposes
    const url = `${window.location.origin}/builder/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setRandomUrl(url);
  }, []);

  function handleCopy(): void {
    navigator.clipboard
      .writeText(randomUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  const removeComponent = (category: string) => {
    localStorage.removeItem(category.toLowerCase());
    setComponents((prev) => {
      const updated = { ...prev };
      delete updated[category.toLowerCase()];
      return updated;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading components...</span>
      </div>
    );
  }

  // Rest of your component rendering logic...
  return (
    <div className="space-y-8 p-8">
      {/* Section 1: Horizontal Component */}
      <div
        className="bg-gray-300 flex justify-center items-center space-x-4 p-2"
        style={{ height: "3rem" }}
      >
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Copy Link
        </button>
        <input
          type="text"
          value={randomUrl}
          readOnly
          className="px-3 py-1 border rounded w-full max-w-xs"
        />
        <button
          onClick={() => removeComponent("unassigned")}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Unassigned
        </button>
      </div>

      {/* Section 2: Table */}
      <div>
        <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Info 1
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Info 2
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {[
              ["CPU", "cpu"],
              ["GPU", "gpu"],
              ["Motherboard", "motherboard"],
              ["Memory", "memory"],
              ["Storage", "storage"],
              ["Case", "case"],
              ["Power Supply", "powersupply"],
              ["Cooler", "cooler"],
            ].map(([display, key]) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-6 py-4">{display}</td>
                <td className="px-6 py-4">
                  {components[key] ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={components[key].image}
                            alt={components[key].name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{components[key].name}</span>
                      </div>
                      <button
                        onClick={() => removeComponent(key)}
                        className="text-red-500 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => router.push(`/products/${key}`)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Add Product
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  {components[key]
                    ? `₹${components[key].price.toLocaleString()}`
                    : "₹0"}
                </td>
                <td className="px-6 py-4">Placeholder</td>
                <td className="px-6 py-4">Placeholder</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Graphics Display */}
      <div className="border p-4">
        <p>Graphics will appear here.</p>
        {/* ...graphics content... */}
      </div>
    </div>
  );
}
