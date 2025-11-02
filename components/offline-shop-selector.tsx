"use client"

import { useState } from "react"
import { offlineShops, OfflineShop } from "@/data/offline-shops"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, User, Phone, Star } from "lucide-react"
import Image from "next/image"

interface OfflineShopSelectorProps {
  onShopSelect: (shop: OfflineShop) => void
  onClose: () => void
}

export default function OfflineShopSelector({ onShopSelect, onClose }: OfflineShopSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Offline Shop</h2>
            <p className="text-gray-600">Select a shop to book your ritual materials offline</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            ✕ Close
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offlineShops.map((shop) => (
              <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={shop.photo}
                    alt={shop.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    Available
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-gray-900">{shop.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.5 Rating • {shop.speciality}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Shopkeeper</p>
                      <p className="text-sm text-gray-600">{shop.shopkeeperName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-sm text-gray-600">{shop.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{shop.timings}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{shop.contact}</span>
                  </div>

                  <div className="pt-2">
                    <Button 
                      onClick={() => onShopSelect(shop)}
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      Take Token / टोकन लें
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}