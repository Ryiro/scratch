'use server'

import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"

interface FormData {
  name: string;
  company: string;
  price: string;
  image: string;
  type: "CPU" | "GPU" | "RAM" | "STORAGE" | "MOTHERBOARD" | "COOLER" | "POWERSUPPLY" | "CASE";
  // Component specific fields
  microarchitecture?: string;
  coreCount?: string;
  coreClock?: string;
  boostClock?: string;
  chipset?: string;
  memory?: string;
  TDP?: string;
  // Add other component fields as needed
}

export async function createProduct(formData: FormData) {
  try {
    console.log("Received form data:", formData) // Debug log

    // Create the main product
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        manufacturer: formData.company,
        price: parseFloat(formData.price),
        image: formData.image, // This should now be a string path
        category: formData.type,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        inStock: true,
        count: 0
      }
    })

    // Based on type, create the corresponding component entry
    if (formData.type === 'CPU') {
      await prisma.cpu.create({
        data: {
          productId: product.id,
          microarchitecture: formData.microarchitecture || '',
          coreCount: formData.coreCount ? parseInt(formData.coreCount) : null,
          coreClock: formData.coreClock ? parseInt(formData.coreClock) : null,
          boostClock: formData.boostClock ? parseInt(formData.boostClock) : null,
          inStock: true,
          count: 0
        }
      })
    }
    else if (formData.type === 'GPU') {
      await prisma.gpu.create({
        data: {
          productId: product.id,
          chipset: formData.chipset || null,
          memory: formData.memory ? parseInt(formData.memory) : null,
          coreClock: formData.coreClock ? parseInt(formData.coreClock) : null,
          boostClock: formData.boostClock ? parseInt(formData.boostClock) : null,
          TDP: formData.TDP ? parseInt(formData.TDP) : null,
          inStock: true,
          count: 0
        }
      })
    }

    console.log("Product created successfully:", product.id) // Debug log
    revalidatePath('/products')
    return { success: true, id: product.id }
  } catch (error) {
    console.error('Detailed error:', error) // Debug log
    return { success: false, error: String(error) }
  }
}
