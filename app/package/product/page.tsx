"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ProductCatalog from "@/components/product-catalog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Plus, ShoppingCart } from "lucide-react"

export default function PackageProductPage() {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [showProducts, setShowProducts] = useState(false)
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    // Get selected package from localStorage
    const packageData = localStorage.getItem('selectedPackage')
    if (packageData) {
      const parsed = JSON.parse(packageData)
      // Check if data is not too old (1 hour)
      if (Date.now() - parsed.timestamp < 3600000) {
        setSelectedPackage(parsed)
      } else {
        // Redirect to package page if data is old
        router.push('/package')
      }
    } else {
      // Redirect to package page if no data
      router.push('/package')
    }
  }, [router])

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    const packagePrice = selectedPackage?.items?.reduce((sum: number, item: any) => sum + (item.price || 0), 0) || 0
    const additionalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    return packagePrice + additionalPrice
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your package details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/package')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Packages
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Selected Package</h1>
                <p className="text-gray-600">Add more products to customize your package</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Items: {selectedPackage.items?.length + cart.length}</p>
              <p className="text-lg font-bold text-amber-600">₹{getTotalPrice()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Package Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Package Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {selectedPackage.items?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✓
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.nameHindi}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Items */}
                {cart.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Additional Items:</h4>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            +{item.quantity}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              -
                            </Button>
                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <Button
                    onClick={() => setShowProducts(!showProducts)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {showProducts ? "Hide Products" : "Want to add some more products?"}
                  </Button>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            {showProducts ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Add More Products</h2>
                  <p className="text-gray-600">Browse our complete collection to add more items to your package</p>
                </div>
                <ProductCatalog addToCart={addToCart} />
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Package Selected</h3>
                <p className="text-gray-600 mb-6">
                  Your package includes {selectedPackage.items?.length || 0} essential items for the ceremony.
                </p>
                <Button
                  onClick={() => setShowProducts(true)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}