import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Product from '@/models/Product'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

// Sync database products to data/products.ts file
export async function POST(request: NextRequest) {
  try {
    // Admin authentication check
    const userCookie = request.cookies.get('user')
    if (!userCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = JSON.parse(userCookie.value)
    if (!userData.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await dbConnect()
    
    // Get all products from MongoDB
    const dbProducts = await Product.find().sort({ createdAt: -1 })
    
    // Convert MongoDB products to file format
    const fileProducts = dbProducts.map((product, index) => ({
      id: (index + 1).toString(),
      name: product.name,
      nameHindi: product.nameHindi || undefined,
      price: product.price,
      category: product.category,
      description: product.description || undefined,
      image: product.image || undefined,
      available: product.available !== false,
      // Add package flags if packages exist
      inPackage1: product.packages && product.packages.length > 0,
      inPackage2: product.packages && product.packages.length > 1,
      inPackage3: product.packages && product.packages.length > 2,
    }))

    // Generate TypeScript file content
    const fileContent = `export interface Product {
  id: string
  name: string
  nameHindi?: string
  price: number
  inPackage1?: boolean
  inPackage2?: boolean
  inPackage3?: boolean
  category: string
  description?: string
  image?: string
  available?: boolean
}

export const products: Product[] = ${JSON.stringify(fileProducts, null, 2)}
`

    // Write to data/products.ts
    const filePath = path.join(process.cwd(), 'data', 'products.ts')
    await writeFile(filePath, fileContent, 'utf8')

    console.log(`✅ Synced ${dbProducts.length} products to data/products.ts`)

    return NextResponse.json({
      success: true,
      message: `Synced ${dbProducts.length} products to file`,
      productsCount: dbProducts.length
    })

  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync products' },
      { status: 500 }
    )
  }
}
