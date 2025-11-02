"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart, Star } from "lucide-react"

interface PackageItem {
  name: string
  nameHindi: string
  included: boolean
  price: number
}

interface Package {
  id: string
  name: string
  nameHindi: string
  price: number
  originalPrice: number
  popular: boolean
  items: PackageItem[]
  description: string
  rating: number
}

interface PackageDealsProps {
  addToCart: (item: any) => void
}

export default function PackageDeals({ addToCart }: PackageDealsProps) {
  const packages: Package[] = [
    {
      id: "basic",
      name: "Basic Antim Sanskar Package",
      nameHindi: "मूलभूत अंतिम संस्कार पैकेज",
      price: 5100,
      originalPrice: 5500,
      popular: false,
      rating: 4.6,
      description: "Essential items for traditional last rites ceremony",
      items: [
        { name: "Kafan & Shawl", nameHindi: "कफन और शाल", included: true, price: 150 },
        { name: "Puja Samagri", nameHindi: "पूजा सामग्री", included: true, price: 80 },
        { name: "Sacred Threads", nameHindi: "सुतली नाड़ा", included: true, price: 40 },
        { name: "Abir Gulal", nameHindi: "अबीर गुलाल", included: true, price: 60 },
        { name: "Ghee & Resin", nameHindi: "घी और राल", included: true, price: 100 },
        { name: "Traditional Cap", nameHindi: "पारंपरिक टोपी", included: false, price: 90 },
        { name: "Premium Incense", nameHindi: "प्रीमियम धूप", included: false, price: 70 },
      ],
    },
    {
      id: "standard",
      name: "Standard Complete Package",
      nameHindi: "मानक संपूर्ण पैकेज",
      price: 7500,
      originalPrice: 8000,
      popular: true,
      rating: 4.8,
      description: "Complete package with all essential and additional items",
      items: [
        { name: "Kafan & Shawl", nameHindi: "कफन और शाल", included: true, price: 150 },
        { name: "Puja Samagri", nameHindi: "पूजा सामग्री", included: true, price: 80 },
        { name: "Sacred Threads", nameHindi: "सुतली नाड़ा", included: true, price: 40 },
        { name: "Abir Gulal", nameHindi: "अबीर गुलाल", included: true, price: 60 },
        { name: "Ghee & Resin", nameHindi: "घी और राल", included: true, price: 100 },
        { name: "Traditional Cap", nameHindi: "पारंपरिक टोपी", included: true, price: 90 },
        { name: "Premium Incense", nameHindi: "प्रीमियम धूप", included: true, price: 70 },
        { name: "Cushion & Pillow", nameHindi: "गादी तकिया", included: true, price: 120 },
        { name: "Towels", nameHindi: "तौलिया", included: true, price: 50 },
      ],
    },
    {
      id: "premium",
      name: "Premium Deluxe Package",
      nameHindi: "प्रीमियम डीलक्स पैकेज",
      price: 11000,
      originalPrice: 12000,
      popular: false,
      rating: 4.9,
      description: "Deluxe package with premium quality items and additional services",
      items: [
        { name: "Premium Kafan & Silk Shawl", nameHindi: "प्रीमियम कफन और रेशमी शाल", included: true, price: 250 },
        { name: "Complete Puja Samagri", nameHindi: "संपूर्ण पूजा सामग्री", included: true, price: 150 },
        { name: "Sacred Threads Bundle", nameHindi: "सुतली नाड़ा बंडल", included: true, price: 60 },
        { name: "Premium Abir Gulal", nameHindi: "प्रीमियम अबीर गुलाल", included: true, price: 100 },
        { name: "Pure Ghee & Resin", nameHindi: "शुद्ध घी और राल", included: true, price: 150 },
        { name: "Designer Traditional Cap", nameHindi: "डिज़ाइनर पारंपरिक टोपी", included: true, price: 150 },
        { name: "Premium Incense Set", nameHindi: "प्रीमियम धूप सेट", included: true, price: 120 },
        { name: "Luxury Cushion Set", nameHindi: "लक्जरी गादी सेट", included: true, price: 200 },
        { name: "Premium Towel Set", nameHindi: "प्रीमियम तौलिया सेट", included: true, price: 80 },
        { name: "Coconut & Offerings", nameHindi: "नारियल और प्रसाद", included: true, price: 50 },
      ],
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Deals / पैकेज ऑफर</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            संपूर्ण अंतिम संस्कार के लिए विशेष पैकेज - बेहतर मूल्य पर सभी आवश्यक सामग्री
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative ${pkg.popular ? "ring-2 ring-amber-500 shadow-xl" : "shadow-lg"} hover:shadow-xl transition-shadow duration-300`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-1">
                  Most Popular / सबसे लोकप्रिय
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-2">
                  {pkg.name}
                  <div className="text-sm font-normal text-gray-600 mt-1">{pkg.nameHindi}</div>
                </CardTitle>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{pkg.rating}</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-amber-900">₹{pkg.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Save ₹{pkg.originalPrice - pkg.price}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mt-3">{pkg.description}</p>
              </CardHeader>

              <CardContent className="px-6">
                <div className="space-y-3">
                  {pkg.items.map((item, index) => (
                    <div key={index} className={`flex items-center gap-3 ${!item.included ? "opacity-50" : ""}`}>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          item.included ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.nameHindi}</div>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs text-amber-600">•</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  onClick={() =>
                    addToCart({
                      id: pkg.id,
                      name: pkg.name,
                      nameHindi: pkg.nameHindi,
                      price: pkg.price,
                      type: "package",
                    })
                  }
                  className={`w-full ${
                    pkg.popular ? "bg-amber-500 hover:bg-amber-600" : "bg-amber-900 hover:bg-amber-800"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart / कार्ट में जोड़ें
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom package? / कस्टम पैकेज चाहिए?</p>
          <Button variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent">
            Contact Us / संपर्क करें
          </Button>
        </div>
      </div>
    </section>
  )
}
