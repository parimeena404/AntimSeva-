"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart, Package, MapPin, Truck } from "lucide-react"
import { basicKit, basicKitItems } from "@/data/products"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"
import Cart from "@/components/cart"

export default function FuneralSamagriPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { addToCart, getTotalItems, openCart, closeCart, isCartOpen, cartItems, updateCartItem, getTotalPrice, clearCart } = useCart()
  const [activeSection, setActiveSection] = useState("services")
  const [selectedLocation, setSelectedLocation] = useState("local")

  const locationOptions = [
    { value: "local", label: "Within Indore City", labelHindi: "इंदौर शहर के अंदर", charge: 100 },
    { value: "regional", label: "Near Indore (50km)", labelHindi: "इंदौर के आसपास (50km)", charge: 200 },
    { value: "outstation", label: "Outside Indore", labelHindi: "इंदौर के बाहर", charge: 300 }
  ]

  const getCurrentDeliveryCharge = () => {
    const location = locationOptions.find(opt => opt.value === selectedLocation)
    return location ? location.charge : 100
  }

  const getKitTotalPrice = () => {
    return basicKit.basePrice + getCurrentDeliveryCharge()
  }

  // Items with specific prices (as per user requirement)
  const itemsWithPrices = basicKitItems.filter(item => item.price > 0)

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login?callbackUrl=/funeral-samagri&message=Please login to add items to cart')
      return
    }

    try {
      const cartItem = {
        id: basicKit.id,
        name: basicKit.name,
        nameHindi: basicKit.nameHindi,
        price: getKitTotalPrice(),
        quantity: 1,
        type: "Funeral Kit",
        deliveryLocation: selectedLocation,
        deliveryCharge: getCurrentDeliveryCharge()
      }

      // Add to cart using global cart context (this will auto-save to database and open cart)
      addToCart(cartItem)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }



  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={getTotalItems()}
        onCartClick={openCart}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Funeral Samagri - Basic Kit
            </h1>
            <p className="text-xl text-gray-800 mb-2">मूलभूत अंतिम संस्कार किट</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete funeral kit with all essential items for last rites ceremonies - High quality guaranteed
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Kit Details */}
            <div>
              <Card className="shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Package className="w-8 h-8 text-amber-600" />
                    <CardTitle className="text-2xl text-amber-900">
                      {basicKit.name}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600">{basicKit.nameHindi}</p>
                  
                  {/* Price Display */}
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-amber-900 mb-2">
                      ₹{basicKit.basePrice}
                    </div>
                    <p className="text-sm text-gray-600">Base Price (Excluding Delivery)</p>
                    
                    {/* Delivery Location Selector */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Select Delivery Location:
                      </p>
                      <div className="space-y-2">
                        {locationOptions.map((option) => (
                          <label 
                            key={option.value} 
                            className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-white"
                          >
                            <input
                              type="radio"
                              name="location"
                              value={option.value}
                              checked={selectedLocation === option.value}
                              onChange={(e) => setSelectedLocation(e.target.value)}
                              className="text-amber-600"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.labelHindi}</div>
                            </div>
                            <div className="font-bold text-amber-600">+₹{option.charge}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Price:</span>
                        <span className="text-2xl font-bold text-green-600">₹{getKitTotalPrice()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Including delivery charges</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg font-semibold mb-4"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isAuthenticated ? 'Add to Cart / कार्ट में जोड़ें' : 'Login to Add to Cart'}
                  </Button>

                  {!isAuthenticated && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <p className="text-sm text-blue-800">
                        Please login to add items to cart and proceed with checkout
                        <br />
                        <span className="text-xs">कार्ट में जोड़ने के लिए कृपया लॉगिन करें</span>
                      </p>
                    </div>
                  )}
                  
                  {/* Quality & Delivery Info */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm">High Quality Guaranteed / उच्च गुणवत्ता की गारंटी</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-600">
                      <Truck className="w-5 h-5" />
                      <span className="text-sm">Fast Delivery Available / तेज़ डिलीवरी उपलब्ध</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-600">
                      <Package className="w-5 h-5" />
                      <span className="text-sm">Complete Kit - No Missing Items / पूरी किट - कोई चीज़ नहीं छूटी</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Items List */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    Kit Contents ({basicKitItems.length} Items)
                  </CardTitle>
                  <p className="text-gray-600">किट की सामग्री</p>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {basicKitItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.nameHindi}</div>
                            <div className="text-sm text-gray-500">{item.quantity}</div>
                          </div>
                        </div>
                        {item.price > 0 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ₹{item.price}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Items with Specific Prices */}
                  {itemsWithPrices.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        Items with Specific Prices (विशिष्ट मूल्य वाली वस्तुएं):
                      </h4>
                      <div className="space-y-2">
                        {itemsWithPrices.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-blue-800">{item.nameHindi}</span>
                            <span className="font-semibold text-blue-900">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need help or have questions? / सहायता या प्रश्न चाहिए?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919179677292"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                Call: +91 91796 77292
              </a>
              <a
                href="https://wa.me/9179677292"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        updateItem={updateCartItem}
        total={getTotalPrice()}
        clearCart={clearCart}
      />
    </>
  )
}