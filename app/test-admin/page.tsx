'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
  available?: boolean
}

export default function TestAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    available: true
  })

  // Load products from products.ts file
  const loadProducts = async () => {
    try {
      console.log('🔄 Loading products...')
      const { products: staticProducts } = await import('@/data/products')
      console.log('✅ Products loaded:', staticProducts.length)
      setProducts(staticProducts)
      setLoading(false)
      toast.success(`✅ Loaded ${staticProducts.length} products`)
    } catch (error) {
      console.error('❌ Error loading products:', error)
      toast.error('❌ Failed to load products')
      setLoading(false)
    }
  }

  // Test upload API
  const testUploadAPI = async (file: File) => {
    try {
      console.log('🔄 Testing upload API...')
      setIsUploading(true)
      toast.loading('Uploading photo...')
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const responseText = await response.text()
      console.log('📤 Upload response:', response.status, responseText)

      if (response.ok) {
        const data = JSON.parse(responseText)
        console.log('✅ Upload successful:', data)
        toast.success('✅ Photo uploaded successfully!')
        return data.url || data.imageUrl
      } else {
        console.error('❌ Upload failed:', response.status, responseText)
        toast.error(`❌ Upload failed: ${response.status}`)
        return null
      }
    } catch (error) {
      console.error('❌ Upload error:', error)
      toast.error('❌ Upload error occurred')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  // Test file update API
  const testFileUpdateAPI = async (updatedProducts: Product[]) => {
    try {
      console.log('🔄 Testing file update API...')
      toast.loading('Updating products file...')
      
      const response = await fetch('/api/admin/update-products-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      })

      const responseText = await response.text()
      console.log('📤 File update response:', response.status, responseText)

      if (response.ok) {
        const data = JSON.parse(responseText)
        console.log('✅ File update successful:', data)
        toast.success(`✅ Products file updated! (${updatedProducts.length} products)`)
        return true
      } else {
        console.error('❌ File update failed:', response.status, responseText)
        toast.error(`❌ File update failed: ${response.status}`)
        return false
      }
    } catch (error) {
      console.error('❌ File update error:', error)
      toast.error('❌ File update error occurred')
      return false
    }
  }

  // Save product
  const handleSaveProduct = async () => {
    try {
      console.log('🔄 Saving product...')
      
      if (!formData.name.trim()) {
        toast.error('❌ Product name is required')
        return
      }
      
      if (formData.price <= 0) {
        toast.error('❌ Price must be greater than 0')
        return
      }
      
      if (!formData.category.trim()) {
        toast.error('❌ Category is required')
        return
      }

      let updatedProducts = [...products]
      
      if (editingProduct) {
        // Update existing
        updatedProducts = products.map(p => 
          p.id === editingProduct.id 
            ? { ...formData, id: editingProduct.id }
            : p
        )
        console.log('✏️ Updating product:', editingProduct.id)
      } else {
        // Add new
        const newProduct = {
          ...formData,
          id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
        updatedProducts = [...products, newProduct]
        console.log('➕ Adding new product:', newProduct.id)
      }

      // Update local state first
      setProducts(updatedProducts)
      
      // Try to update file
      const fileUpdateSuccess = await testFileUpdateAPI(updatedProducts)
      
      if (fileUpdateSuccess) {
        // Reset form only if file update was successful
        setEditingProduct(null)
        setFormData({
          name: '',
          price: 0,
          category: '',
          description: '',
          image: '',
          available: true
        })
        
        console.log('✅ Product saved successfully!')
      } else {
        // Revert local state if file update failed
        setProducts(products)
        console.log('❌ Product save failed, reverted changes')
      }
    } catch (error) {
      console.error('❌ Save error:', error)
      toast.error('❌ Save failed')
      // Revert local state
      setProducts(products)
    }
  }

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    try {
      console.log('🔄 Deleting product:', productId)
      
      if (!confirm('Are you sure you want to delete this product?')) {
        return
      }
      
      const originalProducts = [...products]
      const updatedProducts = products.filter(p => p.id !== productId)
      
      // Update local state first
      setProducts(updatedProducts)
      
      // Try to update file
      const fileUpdateSuccess = await testFileUpdateAPI(updatedProducts)
      
      if (fileUpdateSuccess) {
        console.log('✅ Product deleted successfully!')
      } else {
        // Revert local state if file update failed
        setProducts(originalProducts)
        console.log('❌ Product delete failed, reverted changes')
      }
    } catch (error) {
      console.error('❌ Delete error:', error)
      toast.error('❌ Delete failed')
    }
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('📸 File selected:', file.name, file.size, 'bytes')
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('❌ File too large. Maximum 10MB allowed.')
      return
    }

    const imageUrl = await testUploadAPI(file)
    if (imageUrl) {
      setFormData(prev => ({ ...prev, image: imageUrl }))
      console.log('✅ Image URL set:', imageUrl)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🧪 Admin Panel Test</h1>
          <p className="text-gray-600">Test all admin functionality without authentication</p>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Products: {products.length}
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Server: Running
            </div>
          </div>
        </div>
        
        {/* Add/Edit Product Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">Product Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter product name"
                    className="text-lg p-3"
                  />
                </div>
                
                <div>
                  <Label className="text-lg font-medium">Price (₹) *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    placeholder="Enter price"
                    className="text-lg p-3"
                  />
                </div>
                
                <div>
                  <Label className="text-lg font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="text-lg p-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="पूजा सामग्री">पूजा सामग्री</SelectItem>
                      <SelectItem value="भोजन सामग्री">भोजन सामग्री</SelectItem>
                      <SelectItem value="दवाएं">दवाएं</SelectItem>
                      <SelectItem value="अन्य आवश्यक वस्तुएं">अन्य आवश्यक वस्तुएं</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">Upload Photo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {isUploading ? (
                      <div className="space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-600">Uploading to Google Drive...</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <Label className="text-sm text-gray-600">Or enter image URL:</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                  </div>
                  
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                        onError={(e) => {
                          console.log('❌ Image failed to load:', formData.image)
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <Label className="text-lg font-medium">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter product description"
                    rows={4}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={(e) => setFormData({...formData, available: e.target.checked})}
                className="w-4 h-4"
              />
              <Label htmlFor="available" className="text-lg">Product Available</Label>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={handleSaveProduct} 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                disabled={isUploading}
              >
                {editingProduct ? '✏️ Update Product' : '➕ Add Product'}
              </Button>
              
              {editingProduct && (
                <Button 
                  onClick={() => {
                    setEditingProduct(null)
                    setFormData({
                      name: '',
                      price: 0,
                      category: '',
                      description: '',
                      image: '',
                      available: true
                    })
                  }} 
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  ❌ Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">📦 Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {products.slice(0, 20).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4 flex-1">
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-gray-600">
                        ₹{product.price} | {product.category} | ID: {product.id.slice(-8)}
                      </p>
                      {product.description && (
                        <p className="text-sm text-gray-500 mt-1">{product.description.slice(0, 100)}...</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product)
                        setFormData({
                          name: product.name,
                          price: product.price,
                          category: product.category,
                          description: product.description || '',
                          image: product.image || '',
                          available: product.available ?? true
                        })
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      ✏️ Edit
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              ))}
              
              {products.length > 20 && (
                <div className="text-center p-4 text-gray-500">
                  ... and {products.length - 20} more products
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
