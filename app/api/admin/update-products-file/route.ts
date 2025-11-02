import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // For development - skip auth temporarily
    const isDev = process.env.NODE_ENV !== 'production'
    
    if (!isDev) {
      // Check admin authorization in production
      const userCookie = request.cookies.get('user')
      if (!userCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const userData = JSON.parse(userCookie.value)
      if (!userData.isAdmin) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
      }
    }

    const { products } = await request.json()

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid products data' }, { status: 400 })
    }

    // Generate TypeScript content
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

export const products: Product[] = ${JSON.stringify(products, null, 2)}
`

    // Write to products.ts file
    const filePath = path.join(process.cwd(), 'data', 'products.ts')
    await writeFile(filePath, fileContent, 'utf8')

    return NextResponse.json({ 
      message: `Successfully updated products.ts with ${products.length} products`,
      count: products.length
    })

  } catch (error) {
    console.error('Error updating products file:', error)
    return NextResponse.json({ 
      error: 'Failed to update products file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
