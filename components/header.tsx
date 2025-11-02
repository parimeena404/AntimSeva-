"use client"

import { ShoppingCart, Phone, MapPin, User, LogOut, Menu, X, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  cartItemsCount: number
  onCartClick: () => void
}

export default function Header({ activeSection, setActiveSection, cartItemsCount, onCartClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (itemId: string) => {
    if (itemId === 'about') {
      router.push('/about');
    } else if (itemId === 'contact') {
      router.push('/contact');
    } else if (itemId === 'faq') {
      router.push('/faq');
    } else if (itemId === 'blogs') {
      router.push('/blogs'); // ✅ blogs route
    } else if (itemId === 'packages') {
      router.push('/package'); // ✅ dedicated package page
    } else if (itemId === 'funeral-samagri') {
      router.push('/funeral-samagri'); // ✅ funeral samagri page
    } else {
      if (itemId === 'home') {
        router.push('/');
        setActiveSection('home');
      } else if (itemId === 'services') {
        if (window.location.pathname !== '/') {
          router.push('/');
          setTimeout(() => {
            setActiveSection(itemId);
          }, 100);
        } else {
          setActiveSection(itemId);
        }
      }
    }
  }


  const navItems = [
    { id: "home", label: "Home / होम", icon: null },
    { id: "packages", label: "Packages / पैकेज", icon: null },
    { id: "funeral-samagri", label: "Funeral Kit / किट", icon: null },
    // { id: "services", label: "Services / सेवाएं", icon: null },
    { id: "about", label: "About / हमारे बारे में", icon: null },
    { id: "contact", label: "Contact / संपर्क", icon: null },
    { id: "faq", label: "FAQ / प्रश्न", icon: null },
    { id: "blogs", label: "Blogs / ब्लॉग्स", icon: null }, // ✅ new item
  ]


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-amber-900 text-white py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+919179677292" className="flex items-center gap-1 hover:text-amber-200 transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 91796 77292</span>
            </a>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Indore, Madhya Pradesh</span>
            </div>
          </div>
          <div className="text-xs">24/7 Emergency Service Available</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >

            <img
              src="/products/LogoWithoutText.jpg"   // <-- place your logo file in public folder and change the name here
              alt="Antim Seva Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-full"
            // className="w-8 h-8 md:w-12 md:h-12 bg-amber-900 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-xl"
            />

            <div>
              <h1 className="text-lg md:text-2xl font-bold text-amber-900">Antim Seva</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">अंतिम संस्कार आवश्यक वस्तुएं</p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={onCartClick}
              variant="outline"
              className="relative border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Order History Button - Visible for all users */}
            <Button
              onClick={() => router.push('/orders')}
              variant="outline"
              className="border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent"
            >
              <History className="w-5 h-5 mr-2" />
              Orders
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-amber-900 hover:bg-amber-50">
                    <User className="w-5 h-5 mr-2" />
                    {user?.name?.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile / प्रोफाइल
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/orders')}>
                    <History className="w-4 h-4 mr-2" />
                    Order History / ऑर्डर इतिहास
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={async () => {
                    await logout();
                    router.push('/');
                  }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout / लॉगआउट
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-amber-900 hover:bg-amber-50"
                  onClick={() => router.push('/login')}
                >
                  Login / लॉगिन
                </Button>
                <Button
                  variant="default"
                  className="bg-amber-900 hover:bg-amber-800"
                  onClick={() => router.push('/register')}
                >
                  Register / रजिस्टर
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              onClick={onCartClick}
              variant="outline"
              size="sm"
              className="relative border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent p-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Order History Button */}
            <Button
              onClick={() => router.push('/orders')}
              variant="outline"
              size="sm"
              className="border-amber-900 text-amber-900 hover:bg-amber-50 bg-transparent p-2"
            >
              <History className="w-4 h-4" />
            </Button>

            {!isAuthenticated && (
              <Button
                size="sm"
                className="bg-amber-900 hover:bg-amber-800 text-xs px-2"
                onClick={() => router.push('/register')}
              >
                Register
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-900 p-2"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Background Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute top-0 right-0 h-full w-3/5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="p-4 flex flex-col h-full overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="self-end text-amber-900 hover:text-amber-700 mb-4"
                >
                  ✕
                </button>

                {/* Auth Buttons */}
                {!isAuthenticated ? (
                  <div className="flex gap-2 mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-amber-900 hover:bg-amber-50"
                      onClick={() => {
                        router.push('/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Login / लॉगिन
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mb-3">
                    {/* Profile, Orders, Logout same as before */}
                  </div>
                )}

                {/* Navigation Items */}
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavigation(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 text-sm font-medium transition-colors rounded text-left ${activeSection === item.id
                        ? "bg-amber-900 text-white"
                        : "text-amber-900 hover:bg-amber-50"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Desktop Navigation */}
      <nav className="bg-amber-800 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors hover:bg-amber-700 ${activeSection === item.id ? "bg-amber-700 border-b-2 border-white" : ""
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
