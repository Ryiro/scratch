"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();

  const [randomUrl, setRandomUrl] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, { name: string }>
  >({});

  // Generate random URL on mount
  useEffect(() => {
    const randomString = Math.random().toString(36).substring(2, 8);
    setRandomUrl(`/builder/${randomString}`);
  }, []);

  // Function to handle copy button
  const handleCopy = () => {
    navigator.clipboard.writeText(randomUrl);
  };

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
        <button className="px-3 py-1 bg-gray-500 text-white rounded">
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
              "CPU",
              "GPU",
              "Motherboard",
              "Memory",
              "Storage",
              "Case",
              "Power Supply",
              "Cooler",
            ].map((category) => (
              <tr key={category} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    href={`/products/${category
                      .toLowerCase()
                      .replace(/\s+/g, "")}`}
                  >
                    {category}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {selectedProducts[category] ? (
                    <div className="flex items-center justify-between">
                      <span>{selectedProducts[category].name}</span>
                      <button
                        onClick={() => {
                          setSelectedProducts((prev) => {
                            const newState = { ...prev };
                            delete newState[category];
                            return newState;
                          });
                        }}
                        className="text-red-500 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        router.push(`/products/${category.toLowerCase()}`);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Add Product
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">$0</td>
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
