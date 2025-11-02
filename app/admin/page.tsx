'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Trash2, Edit, Plus, LogOut, Shield, Package } from 'lucide-react'
import { toast } from 'sonner'

// Admin authorized emails
const AUTHORIZED_ADMINS = [
  'vaibhavmalviyaji@gmail.com',
  'tiwarianurag342407@gmail.com',
  'pradumnporwal@gmail.com',
  'gauravperuliya7@gmail.com',
]

interface Product {
  id?: string
  _id?: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
  available?: boolean
}

interface AdminUser {
  email: string
  name: string
  picture: string
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [isEditingProduct, setIsEditingProduct] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const router = useRouter()

  // Check if user is authenticated and authorized
  useEffect(() => {
    checkAuth()
    loadProducts()
  }, [])

  const checkAuth = async () => {
    try {
      // For development testing - bypass auth temporarily
      const tempUser = {
        email: 'tiwarianurag342407@gmail.com',
        name: 'Admin User',
        picture: '',
        isAdmin: true
      }
      setUser(tempUser)
      setIsAuthorized(true)
      setLoading(false)
      return
      
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        
        // Check if user email is in authorized list
        const isAuthorizedUser = AUTHORIZED_ADMINS.includes(userData.user.email)
        setIsAuthorized(isAuthorizedUser)
        
        if (!isAuthorizedUser) {
          toast.error('Unauthorized access. Only admin users are allowed.')
          setTimeout(() => router.push('/'), 3000)
        }
      } else {
        // User not authenticated, redirect to login page
        router.push('/login?provider=google&redirect=/admin')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login?provider=google&redirect=/admin')
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      // Load from products.ts file directly for admin panel
      const { products: staticProducts } = await import('@/data/products')
      console.log('Products loaded from file:', staticProducts.length)
      setProducts(staticProducts)
    } catch (error) {
      console.error('Error loading products from file:', error)
      toast.error('Failed to load products from file')
    }
  }

  const updateProductsFile = async (updatedProducts: Product[]) => {
    try {
      // Update local state immediately
      setProducts(updatedProducts)
      
      // Also update the actual products.ts file
      const response = await fetch('/api/admin/update-products-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      })
      
      if (response.ok) {
        const data = await response.json()
        toast.success('Products updated successfully!')
        console.log('File updated:', data.message)
      } else {
        const error = await response.json()
        console.error('File update failed:', error)
        toast.error('Products updated locally but file update failed')
      }
    } catch (error) {
      console.error('Error updating products:', error)
      toast.error('Failed to update products')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleAddProduct = () => {
    setCurrentProduct({
      id: '',
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      available: true
    })
    setIsEditingProduct(true)
  }

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setIsEditingProduct(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const updatedProducts = products.filter(p => p.id !== productId)
        await updateProductsFile(updatedProducts)
        toast.success('Product deleted successfully')
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  const handleSaveProduct = async (productData: Product) => {
    try {
      let updatedProducts
      
      if (productData.id) {
        // Update existing product
        updatedProducts = products.map(p => 
          p.id === productData.id ? productData : p
        )
        toast.success('Product updated successfully')
      } else {
        // Add new product
        const newProduct = {
          ...productData,
          id: Date.now().toString() // Simple ID generation
        }
        updatedProducts = [...products, newProduct]
        toast.success('Product added successfully')
      }
      
      await updateProductsFile(updatedProducts)
      setIsEditingProduct(false)
      setCurrentProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-amber-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Checking authorization...</p>
        </div>
      </div>
    )
  }

  // Unauthorized access
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-red-700">Access Denied</CardTitle>
            <CardDescription>
              Only authorized admin users can access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Current user: {user?.email || 'Not logged in'}
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Antim Seva Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              {user?.picture && (
                <img
                  src={user.picture}
                  alt="Admin"
                  className="h-10 w-10 rounded-full"
                />
              )}
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <p className="text-gray-600">Add, edit, or delete products from the catalog</p>
              </div>
              <Button onClick={handleAddProduct} className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Products ({products.length})</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {product.image ? (
                                <img
                                  className="h-10 w-10 rounded object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                  <Package className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              {product.description && (
                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                  {product.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={product.available ? "default" : "secondary"}>
                            {product.available ? "Available" : "Unavailable"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product._id || product.id || '')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                  <div className="mt-6">
                    <Button onClick={handleAddProduct} className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage customer orders and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Order management functionality will be implemented soon. Orders are currently logged in the console and localStorage.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Authorized Admin Emails</Label>
                    <div className="mt-2 space-y-2">
                      {AUTHORIZED_ADMINS.map((email) => (
                        <Badge key={email} variant="secondary" className="mr-2">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      To modify authorized admin emails, update the AUTHORIZED_ADMINS array in the admin page source code.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Edit Dialog */}
      <ProductEditDialog
        product={currentProduct}
        isOpen={isEditingProduct}
        onClose={() => {
          setIsEditingProduct(false)
          setCurrentProduct(null)
        }}
        onSave={handleSaveProduct}
      />
    </div>
  )
}

// Product Edit Dialog Component
interface ProductEditDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
}

function ProductEditDialog({ product, isOpen, onClose, onSave }: ProductEditDialogProps) {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    available: true
  })
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url })) // Use 'url' instead of 'imageUrl'
        toast.success('Image uploaded successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || formData.price <= 0) {
      toast.error('Please fill in all required fields')
      return
    }

    // For editing existing products, preserve the original _id
    const productToSave = {
      ...formData,
      _id: formData._id || formData.id,
      id: formData._id || formData.id || `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    onSave(productToSave)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {product?.id ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            Fill in the product details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="पूजा सामग्री">पूजा सामग्री</SelectItem>
                <SelectItem value="भोजन सामग्री">भोजन सामग्री</SelectItem>
                <SelectItem value="दवाएं">दवाएं</SelectItem>
                <SelectItem value="अन्य आवश्यक वस्तुएं">अन्य आवश्यक वस्तुएं</SelectItem>
                <SelectItem value="पैकेज डील्स">पैकेज डील्स</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Product Image</Label>
            <div className="space-y-4">
              {/* Current Image Preview */}
              {formData.image && (
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, image: '' })}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
              
              {/* Drag & Drop Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  dragActive 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
                
                <div className="text-center">
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                      <p className="text-sm text-gray-600">Uploading image...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Package className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-amber-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Or enter URL manually */}
              <div className="text-center text-sm text-gray-500">Or</div>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL manually"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            />
            <Label htmlFor="available">Product Available</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              {product?._id || product?.id ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
