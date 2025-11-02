"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

interface CartItem {
  id: string
  name: string
  nameHindi?: string
  price: number
  quantity: number
  type?: string
  deliveryLocation?: string
  deliveryCharge?: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  updateCartItem: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartSessionId, setCartSessionId] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  // Generate or get session ID for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      let sessionId = localStorage.getItem("cartSessionId")
      if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("cartSessionId", sessionId)
      }
      setCartSessionId(sessionId)
    }
  }, [isAuthenticated])

  // Load cart from database when component mounts
  useEffect(() => {
    const loadCart = async () => {
      try {
        const headers: any = {}
        if (cartSessionId && !isAuthenticated) {
          headers["x-session-id"] = cartSessionId
        }

        const response = await fetch("/api/cart", {
          headers: headers,
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.cart && data.cart.items) {
            setCartItems(data.cart.items)
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }

    // Load cart after session ID is set or user is authenticated
    if ((cartSessionId && !isAuthenticated) || isAuthenticated) {
      loadCart()
    }
  }, [cartSessionId, isAuthenticated])

  // Save cart to database whenever cart items change
  useEffect(() => {
    const saveCart = async () => {
      try {
        const headers: any = {
          "Content-Type": "application/json",
        }

        if (cartSessionId && !isAuthenticated) {
          headers["x-session-id"] = cartSessionId
        }

        await fetch("/api/cart", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            items: cartItems,
            sessionId: cartSessionId,
          }),
        })
      } catch (error) {
        console.error("Error saving cart:", error)
      }
    }

    // Only save if we have items and session/user info
    if (cartItems.length > 0 && ((cartSessionId && !isAuthenticated) || isAuthenticated)) {
      saveCart()
    } else if (cartItems.length === 0 && ((cartSessionId && !isAuthenticated) || isAuthenticated)) {
      // Clear cart in database if empty
      const clearCart = async () => {
        try {
          const headers: any = {}
          if (cartSessionId && !isAuthenticated) {
            headers["x-session-id"] = cartSessionId
          }

          await fetch("/api/cart", {
            method: "DELETE",
            headers: headers,
          })
        } catch (error) {
          console.error("Error clearing cart:", error)
        }
      }
      clearCart()
    }
  }, [cartItems, cartSessionId, isAuthenticated])

  // Migrate guest cart when user logs in
  useEffect(() => {
    const migrateCart = async () => {
      if (isAuthenticated && cartSessionId) {
        try {
          const response = await fetch("/api/cart", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: cartSessionId,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success && data.cart && data.cart.items) {
              setCartItems(data.cart.items)
            }
            // Clear guest session ID after migration
            localStorage.removeItem("cartSessionId")
            setCartSessionId(null)
          }
        } catch (error) {
          console.error("Error migrating cart:", error)
        }
      }
    }

    migrateCart()
  }, [isAuthenticated, cartSessionId])

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        )
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
    
    // Auto-open cart when item is added
    setIsCartOpen(true)
  }

  const updateCartItem = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    openCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}