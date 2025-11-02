"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Share2, Copy, Calendar, MapPin, User } from "lucide-react"

interface TokenSuccessProps {
  tokenNumber: string
  shopName: string
  customerName: string
  onClose: () => void
}

export default function TokenSuccess({ 
  tokenNumber, 
  shopName, 
  customerName, 
  onClose 
}: TokenSuccessProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(tokenNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy token:', err)
    }
  }

  const handleShare = async () => {
    const shareText = `Token Generated!\nToken: ${tokenNumber}\nShop: ${shopName}\nCustomer: ${customerName}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Antim Seva - Token Generated',
          text: shareText
        })
      } catch (err) {
        console.error('Failed to share:', err)
      }
    } else {
      // Fallback to copying to clipboard
      handleCopyToken()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-900">Token Generated!</h2>
            <p className="text-gray-600">Your booking has been confirmed</p>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-center">
                <Badge variant="secondary" className="text-2xl px-4 py-2 bg-amber-100 text-amber-800">
                  {tokenNumber}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{customerName}</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{shopName}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Booked: {new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleCopyToken}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            <Button 
              onClick={onClose}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Done
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Important:</strong> Please save this token number. Show it at the shop when collecting your items.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}