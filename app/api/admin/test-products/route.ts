import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Product from '@/models/Product'

// GET - Fetch all products (temporarily bypass auth for testing)
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing products API...')
    
    await dbConnect()
    console.log('✅ Database connected')
    
    const products = await Product.find().sort({ createdAt: -1 })
    console.log(`📊 Found ${products.length} products`)
    
    return NextResponse.json({ 
      products,
      count: products.length,
      message: 'Products fetched successfully'
    })
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Create new product (temporarily bypass auth for testing)
export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Testing product creation...')
    
    const productData = await request.json()
    console.log('📝 Product data received:', productData)
    
    await dbConnect()
    console.log('✅ Database connected')
    
    const product = new Product(productData)
    await product.save()
    console.log('✅ Product created:', product._id)
    
    return NextResponse.json({ 
      success: true, 
      product,
      message: 'Product created successfully' 
    })
  } catch (error) {
    console.error('❌ Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    )
  }
}
