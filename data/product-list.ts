// Product List for Antim Seva - Complete Catalog

import { products, packagePricing } from '@/data/products'

export interface ProductListItem {
  id: string
  name: string
  nameHindi: string
  price: number
  category: string
  inPackage1: boolean
  inPackage2: boolean
  inPackage3: boolean
  image?: string
  description?: string
}

export interface ProductCategory {
  id: string
  name: string
  nameHindi: string
  items: ProductListItem[]
  count: number
}

export interface PackageInfo {
  id: string
  name: string
  nameHindi: string
  basePrice: number
  items: ProductListItem[]
  itemCount: number
}

// Complete Product List organized by categories
export const productsByCategory: ProductCategory[] = [
  {
    id: "essential",
    name: "Essential Items",
    nameHindi: "आवश्यक सामग्री",
    items: products.filter(p => p.category === "essential"),
    count: products.filter(p => p.category === "essential").length
  },
  {
    id: "puja",
    name: "Puja Materials",
    nameHindi: "पूजा सामग्री",
    items: products.filter(p => p.category === "puja"),
    count: products.filter(p => p.category === "puja").length
  },
  {
    id: "clothing",
    name: "Clothing Items",
    nameHindi: "वस्त्र सामग्री",
    items: products.filter(p => p.category === "clothing"),
    count: products.filter(p => p.category === "clothing").length
  },
  {
    id: "ritual",
    name: "Ritual Items",
    nameHindi: "अनुष्ठान सामग्री",
    items: products.filter(p => p.category === "ritual"),
    count: products.filter(p => p.category === "ritual").length
  },
  {
    id: "special",
    name: "Special Items",
    nameHindi: "विशेष सामग्री",
    items: products.filter(p => p.category === "special"),
    count: products.filter(p => p.category === "special").length
  }
]

// Complete Package Information
export const packageDetails: PackageInfo[] = [
  {
    id: "package1",
    name: packagePricing.package1.name,
    nameHindi: packagePricing.package1.nameHindi,
    basePrice: packagePricing.package1.basePrice,
    items: packagePricing.package1.items,
    itemCount: packagePricing.package1.items.length
  },
  {
    id: "package2",
    name: packagePricing.package2.name,
    nameHindi: packagePricing.package2.nameHindi,
    basePrice: packagePricing.package2.basePrice,
    items: packagePricing.package2.items,
    itemCount: packagePricing.package2.items.length
  },
  {
    id: "package3",
    name: packagePricing.package3.name,
    nameHindi: packagePricing.package3.nameHindi,
    basePrice: packagePricing.package3.basePrice,
    items: packagePricing.package3.items,
    itemCount: packagePricing.package3.items.length
  }
]

// All Products List
export const allProducts = products

// Statistics
export const productStats = {
  totalProducts: products.length,
  totalCategories: productsByCategory.length,
  totalPackages: packageDetails.length,
  priceRange: {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price))
  },
  categoryBreakdown: productsByCategory.map(cat => ({
    category: cat.name,
    categoryHindi: cat.nameHindi,
    count: cat.count
  }))
}

// Price Calculator Functions
export const calculatePackagePrice = (packageId: string): number => {
  const pkg = packageDetails.find(p => p.id === packageId)
  return pkg ? pkg.basePrice : 0
}

export const calculateItemsTotal = (items: {[key: string]: number}): number => {
  return Object.entries(items).reduce((total, [itemId, quantity]) => {
    const product = products.find(p => p.id === itemId)
    return total + (product ? product.price * quantity : 0)
  }, 0)
}

export const getProductById = (id: string): ProductListItem | undefined => {
  return products.find(p => p.id === id)
}

export const searchProducts = (query: string): ProductListItem[] => {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.nameHindi.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

// Export the original products for backward compatibility
export { products, packagePricing }
