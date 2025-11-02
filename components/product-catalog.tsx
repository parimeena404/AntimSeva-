"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { products } from "@/data/products"

interface ProductCatalogProps {
  addToCart: (item: any) => void
}

export default function ProductCatalog({ addToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Products", nameHindi: "सभी उत्पाद" },
    { id: "essential", name: "Essential Items", nameHindi: "आवश्यक सामग्री" },
    { id: "puja", name: "Puja Materials", nameHindi: "पूजा सामग्री" },
    { id: "clothing", name: "Clothing", nameHindi: "वस्त्र" },
    { id: "ritual", name: "Ritual", nameHindi: "अनुष्ठान" },
    { id: "special", name: "Special", nameHindi: "विशेष" },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products / हमारे उत्पाद</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            धार्मिक विधि-विधान के अनुसार सभी आवश्यक सामग्री उच्च गुणवत्ता के साथ
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-4">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <CardTitle className="text-lg mb-2">
                  {product.name}
                  <div className="text-sm font-normal text-gray-600 mt-1">{product.nameHindi}</div>
                </CardTitle>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">4.5</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    In Stock
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description || "High quality product for traditional ceremonies"}</p>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-amber-900">₹{product.price}</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full bg-amber-900 hover:bg-amber-800"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart / कार्ट में डालें
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
