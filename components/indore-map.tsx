"use client"

import { useEffect, useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IndoreMapProps {
  onLocationSelect: (location: { lat: number; lng: number }, address?: string) => void
  initialLocation?: { lat: number; lng: number }
  className?: string
  error?: string
}

declare global {
  interface Window {
    L: any
  }
}

export default function IndoreMap({ onLocationSelect, initialLocation, className, error }: IndoreMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation || null
  )
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)

  useEffect(() => {
    // Load OpenStreetMap via Leaflet
    const loadMap = async () => {
      // Check if leaflet is already loaded
      if (window.L) {
        initializeMap()
        return
      }

      // Load Leaflet CSS
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""
      document.head.appendChild(linkElement)

      // Load Leaflet JS
      const scriptElement = document.createElement("script")
      scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptElement.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      scriptElement.crossOrigin = ""
      document.body.appendChild(scriptElement)

      scriptElement.onload = () => {
        initializeMap()
      }
    }

    loadMap()

    return () => {
      // Clean up map instance if needed
      const mapContainer = document.getElementById("indore-map")
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer._leaflet = null
      }
    }
  }, [])

  // Effect to get address for initial location
  useEffect(() => {
    if (initialLocation && !selectedAddress) {
      getAddressFromCoordinates(initialLocation.lat, initialLocation.lng)
        .then(address => setSelectedAddress(address))
        .catch(console.error)
    }
  }, [initialLocation])

  const initializeMap = () => {
    if (!window.L || document.getElementById("indore-map")?.hasChildNodes()) {
      return
    }

    // Create map centered on Indore
    const mapInstance = window.L.map("indore-map").setView([22.7196, 75.8577], 13)
    setMap(mapInstance)

    // Add OpenStreetMap tiles
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance)

    // Add a marker for Indore center or initial location
    const initialPos = initialLocation || { lat: 22.7196, lng: 75.8577 }
    const markerInstance = window.L.marker([initialPos.lat, initialPos.lng]).addTo(mapInstance)
    setMarker(markerInstance)

    // Define Indore boundaries (approximate)
    const indoreBounds = window.L.latLngBounds(
      [22.6500, 75.7500], // Southwest corner
      [22.8000, 75.9500]  // Northeast corner
    )

    // Restrict map to Indore area
    mapInstance.setMaxBounds(indoreBounds)
    mapInstance.on("drag", function() {
      mapInstance.panInsideBounds(indoreBounds, { animate: false })
    })

    // Handle map clicks to set location
    mapInstance.on("click", async function(e: any) {
      // Check if click is within Indore bounds
      if (indoreBounds.contains(e.latlng)) {
        await updateMarkerPosition(e.latlng.lat, e.latlng.lng, mapInstance, indoreBounds)
      } else {
        alert("Please select a location within Indore city limits / कृपया इंदौर शहर की सीमा के भीतर एक स्थान चुनें")
      }
    })

    setMapLoaded(true)
  }
  
  // Function to get proper pin code for Indore areas
  const getIndorePinCode = (lat: number, lng: number): string => {
    // Define Indore area pin codes with known correct mappings
    const indoreAreas = [
      // Confirmed correct pin codes
      { lat: 22.6730, lng: 75.8412, pincode: "452005", name: "Chhota Bangarda, Rau" }, // As you confirmed
      { lat: 22.6850, lng: 75.8950, pincode: "452005", name: "Rau Area" }, 
      
      // Central Indore - likely 452001
      { lat: 22.7196, lng: 75.8577, pincode: "452001", name: "Rajwada, GPO Area" },
      { lat: 22.7240, lng: 75.8648, pincode: "452001", name: "MG Road, Sarafa" },
      { lat: 22.7280, lng: 75.8850, pincode: "452001", name: "AB Road, Palasia" },
      
      // Use conservative approach - default to most common pin codes for other areas
      { lat: 22.7110, lng: 75.8550, pincode: "452002", name: "Juni Indore" },
      { lat: 22.6690, lng: 75.9150, pincode: "452003", name: "Dhar Road" },
      { lat: 22.7080, lng: 75.8420, pincode: "452004", name: "Chandan Nagar" },
      { lat: 22.6820, lng: 75.8720, pincode: "452006", name: "Nanda Nagar" },
      { lat: 22.7320, lng: 75.8520, pincode: "452008", name: "Geeta Bhawan" },
      { lat: 22.6893, lng: 75.8635, pincode: "452009", name: "Tilak Nagar" },
      { lat: 22.6940, lng: 75.8350, pincode: "452010", name: "Vijay Nagar" },
      { lat: 22.6950, lng: 75.8950, pincode: "452011", name: "LIG Area" },
      { lat: 22.7140, lng: 75.8780, pincode: "452012", name: "Indrapuri" },
      { lat: 22.7450, lng: 75.9180, pincode: "452013", name: "Treasure Island" },
      { lat: 22.7480, lng: 75.8720, pincode: "452014", name: "Khandwa Road, IET College" },
      { lat: 22.6920, lng: 75.9380, pincode: "452015", name: "Silicon City" },
      { lat: 22.7030, lng: 75.9120, pincode: "452016", name: "Bhawarkua" },
      { lat: 22.7350, lng: 75.9050, pincode: "452016", name: "Scheme 78" },
      { lat: 22.7180, lng: 75.9250, pincode: "452016", name: "Bhawarkua Square" },
      { lat: 22.6580, lng: 75.8950, pincode: "452017", name: "Airport Road" },
      { lat: 22.7580, lng: 75.8380, pincode: "452018", name: "Mari Mata Area" },
      { lat: 22.7420, lng: 75.8150, pincode: "452020", name: "Zoo, Kamla Nehru Prani Sangrahalaya" }
    ]
    
    // Find closest area
    let closestArea = indoreAreas[0]
    let minDistance = Number.MAX_VALUE
    
    indoreAreas.forEach(area => {
      const distance = Math.sqrt(Math.pow(lat - area.lat, 2) + Math.pow(lng - area.lng, 2))
      if (distance < minDistance) {
        minDistance = distance
        closestArea = area
      }
    })
    
    return closestArea.pincode
  }

  // Function to get address from coordinates (reverse geocoding)
  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      setIsGeocodingAddress(true)
      
      // Get the appropriate pin code first
      const pincode = getIndorePinCode(lat, lng)
      
      // Using Nominatim API for reverse geocoding with higher precision
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1&accept-language=en`,
        {
          headers: {
            'User-Agent': 'Antim-Seva-Ecommerce-App'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Geocoding service unavailable')
      }
      
      const data = await response.json()
      
      if (data && data.address) {
        const address = data.address
        const addressParts = []
        
        // Prioritize landmarks and well-known places
        if (address.amenity) {
          // Hospital, restaurant, shop, school, etc.
          let amenityName = address.amenity
          if (address.name) {
            amenityName = address.name
          }
          addressParts.push(amenityName)
        }
        
        if (address.name && !address.amenity) {
          addressParts.push(address.name)
        }
        
        if (address.building) {
          addressParts.push(address.building)
        }
        
        if (address.shop && address.name !== address.shop) {
          addressParts.push(address.shop)
        }
        
        // Add road/street name
        if (address.road) {
          addressParts.push(address.road)
        }
        
        // Add area/locality with preference for well-known areas
        let areaAdded = false
        if (address.suburb && !areaAdded) {
          addressParts.push(address.suburb)
          areaAdded = true
        }
        if (address.neighbourhood && !areaAdded) {
          addressParts.push(address.neighbourhood)
          areaAdded = true
        }
        if (address.locality && !areaAdded) {
          addressParts.push(address.locality)
          areaAdded = true
        }
        
        // Clean up and format the address
        if (addressParts.length > 0) {
          // Remove duplicates and clean up
          const uniqueParts = [...new Set(addressParts)]
          const finalParts = uniqueParts.slice(0, 3) // Take only first 3 parts
          return `${finalParts.join(', ')}, Indore - ${pincode}`
        }
      }
      
      // Fallback: try to extract meaningful info from display_name
      if (data && data.display_name) {
        const displayName = data.display_name
        const parts = displayName.split(', ')
        
        // Look for recognizable Indore landmarks in Hindi and English
        const indoreLandmarks = [
          'Om Shakti Chikitsalaya', 'Mari Mata', 'Zoo', 'Kamla Nehru', 'MG Road', 
          'Khandwa Road', 'IET College', 'Rajwada', 'Sarafa', 'Palasia', 'Vijay Nagar',
          'AB Road', 'Sapna Sangeeta', 'Bhawarkua', 'Aerodrome', 'Race Course',
          'Dhar Road', 'Indrapuri', 'Treasure Island', 'LIG', 'Orbit Mall', 'Chappan Dukan',
          'Geeta Bhawan', 'Silicon City', 'Banganga', 'Mangliya', 'Scheme'
        ]
        
        let foundLandmark = null
        for (const part of parts) {
          const foundMatch = indoreLandmarks.find(landmark => 
            part.toLowerCase().includes(landmark.toLowerCase()) ||
            landmark.toLowerCase().includes(part.toLowerCase())
          )
          if (foundMatch) {
            foundLandmark = part
            break
          }
        }
        
        if (foundLandmark) {
          return `Near ${foundLandmark}, Indore - ${pincode}`
        } else {
          // Take first meaningful parts (excluding country, state)
          const meaningfulParts = parts.filter(part => 
            !part.toLowerCase().includes('india') && 
            !part.toLowerCase().includes('madhya pradesh')
          ).slice(0, 2)
          
          if (meaningfulParts.length > 0) {
            return `${meaningfulParts.join(', ')}, Indore - ${pincode}`
          }
        }
      }
      
      // Final fallback with area name based on coordinates
      const areaName = getAreaNameFromCoordinates(lat, lng)
      return `${areaName}, Indore - ${pincode}`
      
    } catch (error) {
      console.error('Error getting address:', error)
      const pincode = getIndorePinCode(lat, lng)
      const areaName = getAreaNameFromCoordinates(lat, lng)
      return `${areaName}, Indore - ${pincode}`
    } finally {
      setIsGeocodingAddress(false)
    }
  }
  
  // Function to get area name based on coordinates
  const getAreaNameFromCoordinates = (lat: number, lng: number): string => {
    const areas = [
      { lat: 22.7196, lng: 75.8577, name: "Rajwada Area" },
      { lat: 22.7240, lng: 75.8648, name: "MG Road Area" },
      { lat: 22.7110, lng: 75.8550, name: "Juni Indore" },
      { lat: 22.6893, lng: 75.8635, name: "Tilak Nagar" },
      { lat: 22.6730, lng: 75.8412, name: "Rau Area" },
      { lat: 22.6940, lng: 75.8350, name: "Vijay Nagar" },
      { lat: 22.7280, lng: 75.8850, name: "AB Road Area" },
      { lat: 22.7520, lng: 75.8940, name: "Sapna Sangeeta Area" },
      { lat: 22.7030, lng: 75.9120, name: "Bhawarkua Area" },
      { lat: 22.6850, lng: 75.9080, name: "Aerodrome Area" },
      { lat: 22.6690, lng: 75.9150, name: "Dhar Road Area" },
      { lat: 22.7140, lng: 75.8780, name: "Indrapuri Area" },
      { lat: 22.7350, lng: 75.9050, name: "Scheme 78 Area" },
      { lat: 22.7480, lng: 75.8720, name: "Khandwa Road Area" },
      { lat: 22.7580, lng: 75.8380, name: "Mari Mata Area" },
      { lat: 22.7420, lng: 75.8150, name: "Zoo Area (Kamla Nehru Prani Sangrahalaya)" },
      { lat: 22.6950, lng: 75.8950, name: "LIG Area" },
      { lat: 22.7180, lng: 75.9250, name: "Bhawarkua Square Area" }
    ]
    
    // Find closest area
    let closestArea = areas[0]
    let minDistance = Number.MAX_VALUE
    
    areas.forEach(area => {
      const distance = Math.sqrt(Math.pow(lat - area.lat, 2) + Math.pow(lng - area.lng, 2))
      if (distance < minDistance) {
        minDistance = distance
        closestArea = area
      }
    })
    
    return closestArea.name
  }
  
  // Function to update marker position
  const updateMarkerPosition = async (lat: number, lng: number, mapInstance: any, bounds?: any) => {
    // If bounds are provided, check if location is within bounds
    if (bounds && !bounds.contains([lat, lng])) {
      setLocationError("Location is outside Indore city limits / स्थान इंदौर शहर की सीमा से बाहर है")
      return false
    }
    
    // Remove previous marker
    if (marker) {
      mapInstance.removeLayer(marker)
    }
    
    // Add new marker
    const newMarker = window.L.marker([lat, lng]).addTo(mapInstance)
    setMarker(newMarker)
    
    // Update selected location and call callback
    const newLocation = { lat, lng }
    setSelectedLocation(newLocation)
    setLocationError(null)
    
    // Get human-readable address
    const address = await getAddressFromCoordinates(lat, lng)
    setSelectedAddress(address)
    
    // Call the callback with both location and address
    onLocationSelect(newLocation, address)
    
    // Pan map to new location
    mapInstance.panTo([lat, lng])
    
    return true
  }
  
  // Function to get user's current location
  const getCurrentLocation = () => {
    if (!map) return
    
    setIsLocating(true)
    setLocationError(null)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Define Indore boundaries
          const indoreBounds = window.L.latLngBounds(
            [22.6500, 75.7500], // Southwest corner
            [22.8000, 75.9500]  // Northeast corner
          )
          
          // Check if user's location is within Indore
          if (indoreBounds.contains([latitude, longitude])) {
            await updateMarkerPosition(latitude, longitude, map)
          } else {
            setLocationError("Your current location is outside Indore city limits / आपका वर्तमान स्थान इंदौर शहर की सीमा से बाहर है")
            // Center map on Indore but don't set a marker
            map.setView([22.7196, 75.8577], 13)
          }
          
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("Could not access your location. Please enable location services / आपके स्थान तक पहुंच नहीं हो सकी। कृपया लोकेशन सेवाएं सक्षम करें")
          setIsLocating(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setLocationError("Geolocation is not supported by your browser / आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता है")
      setIsLocating(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <Button 
          onClick={getCurrentLocation} 
          disabled={isLocating || !mapLoaded} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 text-sm"
        >
          <Navigation className="w-4 h-4" />
          {isLocating ? "Locating... / पता लगा रहे हैं..." : "Use My Location / मेरा स्थान उपयोग करें"}
        </Button>
      </div>
      
      <div 
        id="indore-map" 
        className={`h-64 rounded-lg border ${error || locationError ? "border-red-500" : "border-gray-300"} ${className}`}
        style={{ width: "100%" }}
      ></div>
      
      {(error || locationError) && (
        <p className="text-red-500 text-sm">{error || locationError}</p>
      )}
      
      {selectedLocation && (
        <div className="text-sm text-gray-600">
          <div className="flex items-center mb-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="font-medium">Selected Location / चुना गया स्थान:</span>
          </div>
          {isGeocodingAddress ? (
            <div className="flex items-center text-gray-500">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-500 mr-2"></div>
              Getting precise address... / सटीक पता प्राप्त कर रहे हैं...
            </div>
          ) : (
            <div className="pl-5">
              {selectedAddress ? (
                <div className="space-y-1">
                  <div className="text-gray-800 font-medium break-words">{selectedAddress}</div>
                  <div className="text-xs text-gray-500">
                    Precise coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </div>
                  <div className="text-xs text-blue-600">
                    ✓ Location verified within Indore city limits
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-gray-800">Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</div>
                  <div className="text-xs text-orange-600">Getting address information...</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}