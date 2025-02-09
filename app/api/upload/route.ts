import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const imageData = formData.get('resizedImage') as string // Get base64 image data
    
    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data received' },
        { status: 400 }
      )
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Save to public/images
    const filePath = path.join(process.cwd(), 'public', 'images', file.name)
    await writeFile(filePath, buffer)
    
    return NextResponse.json({ 
      success: true, 
      path: `/images/${file.name}` 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
