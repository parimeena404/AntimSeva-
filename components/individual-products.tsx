"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, Star } from "lucide-react"
import { products } from "@/data/products"

interface IndividualProductsProps {
  selectedItems: { [key: string]: number }
  onItemChange: (itemId: string, quantity: number) => void
  addToCart?: (item: any) => void
}

export default function IndividualProducts({ selectedItems, onItemChange, addToCart }: IndividualProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Items", nameHindi: "सभी सामग्री" },
    { id: "essential", name: "Essential", nameHindi: "आवश्यक" },
    { id: "puja", name: "Puja Items", nameHindi: "पूजा सामग्री" },
    { id: "clothing", name: "Clothing", nameHindi: "वस्त्र" },
    { id: "ritual", name: "Ritual", nameHindi: "अनुष्ठान" },
    { id: "special", name: "Special", nameHindi: "विशेष" },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const getTotalPrice = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const product = products.find((p) => p.id === itemId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((total, quantity) => total + quantity, 0)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Items / अन्य सामग्री</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">अपनी आवश्यकता के अनुसार अतिरिक्त सामग्री चुनें</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`${
                selectedCategory === category.id
                  ? "bg-amber-900 hover:bg-amber-800"
                  : "border-amber-900 text-amber-900 hover:bg-amber-50"
              }`}
            >
              {category.name} / {category.nameHindi}
            </Button>
          ))}
        </div>

        {/* Selected Items Summary */}
        {getTotalItems() > 0 && (
          <div className="mb-8 bg-amber-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-amber-900">
                  Selected Items: {getTotalItems()} / चुनी गई सामग्री: {getTotalItems()}
                </h3>
              </div>
              <div className="text-xl font-bold text-amber-900">Total: ₹{getTotalPrice()}</div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg?height=150&width=200"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {product.inPackage1 && <Badge className="bg-blue-500 text-xs">P1</Badge>}
                    {product.inPackage2 && <Badge className="bg-green-500 text-xs">P2</Badge>}
                    {product.inPackage3 && <Badge className="bg-purple-500 text-xs">P3</Badge>}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {product.name}
                      <div className="text-sm font-normal text-gray-600 mt-1">{product.nameHindi}</div>
                    </CardTitle>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-amber-900">₹{product.price}</span>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {addToCart && (
                    <Button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        nameHindi: product.nameHindi,
                        price: product.price,
                        quantity: 1
                      })}
                      size="sm"
                      className="bg-amber-900 hover:bg-amber-800"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onItemChange(product.id, Math.max(0, (selectedItems[product.id] || 0) - 1))}
                      disabled={!selectedItems[product.id]}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{selectedItems[product.id] || 0}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onItemChange(product.id, (selectedItems[product.id] || 0) + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {selectedItems[product.id] && (
                    <div className="text-sm font-semibold text-green-600">
                      ₹{product.price * selectedItems[product.id]}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
