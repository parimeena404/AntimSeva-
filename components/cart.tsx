"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CheckoutForm from "./checkout-form"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

interface CartItem {
  id: string
  name: string
  nameHindi?: string
  price: number
  quantity: number
  type?: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  updateItem: (id: string, quantity: number) => void
  total: number
  clearCart?: () => void
}

export default function Cart({ isOpen, onClose, items, updateItem, total, clearCart }: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  
  if (!isOpen) return null

  const handleCheckout = () => {
    console.log('🛒 Proceed to Checkout clicked!')
    console.log('👤 User authenticated:', isAuthenticated)
    console.log('📦 Cart items:', items)
    console.log('💰 Total amount:', total)
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      console.log('⚠️ User not authenticated - redirecting to login')
      // Save current path for redirect after login
      const returnPath = '/';
      router.push(`/login?callbackUrl=${encodeURIComponent(returnPath)}&message=Please login to checkout`)
      return
    }
    
    console.log('✅ User authenticated - proceeding to checkout')
    console.log('📋 Opening checkout form...')
    setIsCheckoutOpen(true)
  }
  
  const handleOrderComplete = () => {
    // Clear cart and close checkout
    if (clearCart) clearCart()
    setIsCheckoutOpen(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart / कार्ट</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">आपका कार्ट खाली है</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.nameHindi && <p className="text-sm text-gray-600">{item.nameHindi}</p>}
                        {item.type && (
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mt-1">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <button onClick={() => updateItem(item.id, 0)} className="text-red-500 hover:text-red-700 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-amber-900">₹{item.price * item.quantity}</div>
                        <div className="text-sm text-gray-500">₹{item.price} each</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total / कुल:</span>
                  <span className="text-2xl font-bold text-amber-900">₹{total}</span>
                </div>

                {!isAuthenticated && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 text-center">
                      Please login to proceed with checkout
                      <br />
                      <span className="text-xs">चेकआउट के लिए कृपया लॉगिन करें</span>
                    </p>
                  </div>
                )}

                {/* Primary Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 mb-3"
                >
                  {isAuthenticated ? '� BUY NOW / अभी खरीदें' : '🔐 LOGIN TO BUY / लॉगिन करें'}
                </Button>

                {/* Secondary Options */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Button
                    onClick={handleCheckout}
                    variant="outline"
                    className="border-amber-600 text-amber-600 hover:bg-amber-50 py-2 text-sm"
                  >
                    🛒 Checkout / चेकआउट
                  </Button>
                  <Button
                    onClick={() => window.open('https://wa.me/9179677292', '_blank')}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 py-2 text-sm"
                  >
                    💬 WhatsApp
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500">🔒 Secure payment • 🚚 Fast delivery</p>
                  <p className="text-xs text-green-600 font-medium">✅ Safe & Encrypted Payment Gateway</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Checkout Form */}
      {isCheckoutOpen && (
        <CheckoutForm 
          cartItems={items} 
          total={total} 
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleOrderComplete}
        />
      )}
    </div>
  )
}
