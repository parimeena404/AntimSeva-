// Migration script to import existing products from data/products.ts to MongoDB
process.env.MONGODB_URI = 'mongodb+srv://tiwarianurag342407:asdfghjkl123A@antim-seva.jfmmpb3.mongodb.net/?retryWrites=true&w=majority&appName=Antim-Seva'

import { connectDB } from '../lib/mongoose.js'
import Product from '../models/Product.js'

// Import existing products data
const existingProducts = [
  {
    name: "Aata (Wheat Flour)",
    price: 450,
    image: "/products/Aata.jpg",
    description: "Premium quality wheat flour for daily use",
    category: "Essential Items",
    packages: [
      { size: "1 kg", price: 450, originalPrice: 500 },
      { size: "5 kg", price: 2200, originalPrice: 2500 },
      { size: "10 kg", price: 4300, originalPrice: 5000 }
    ]
  },
  {
    name: "Abir Gulal Ashtgandh",
    price: 120,
    image: "/products/Abir-Gulal-Ashtgandh.jpg",
    description: "Traditional aromatic powder for religious ceremonies",
    category: "Pooja Items",
    packages: [
      { size: "100g", price: 120, originalPrice: 150 },
      { size: "250g", price: 280, originalPrice: 350 },
      { size: "500g", price: 550, originalPrice: 700 }
    ]
  },
  {
    name: "Chandan Pul (Sandalwood Powder)",
    price: 850,
    image: "/products/Chandan Pul.jpg",
    description: "Pure sandalwood powder for religious and cosmetic use",
    category: "Pooja Items",
    packages: [
      { size: "50g", price: 850, originalPrice: 1000 },
      { size: "100g", price: 1600, originalPrice: 1900 },
      { size: "250g", price: 3800, originalPrice: 4500 }
    ]
  }
  // Add more products as needed...
]

async function migrateProducts() {
  try {
    console.log('🔄 Starting product migration...')
    
    await connectDB()
    console.log('✅ Connected to MongoDB')
    
    // Clear existing products
    await Product.deleteMany({})
    console.log('🗑️ Cleared existing products')
    
    // Insert new products
    for (const productData of existingProducts) {
      const product = new Product(productData)
      await product.save()
      console.log(`✅ Migrated: ${product.name}`)
    }
    
    console.log(`🎉 Migration completed! ${existingProducts.length} products imported`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    process.exit(0)
  }
}

// Run migration
migrateProducts()
