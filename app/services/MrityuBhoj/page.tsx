"use client"
import React, { useState } from 'react'
import Header from '@/components/header'
import Footer from "@/components/footer"
import { motion } from "framer-motion"

function MrityuBhoj() {
  const [activeSection, setActiveSection] = useState("services")
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Dummy Mrityu Bhoj Vendor Data
  const vendors = [
    {
      id: 1,
      name: "Sharma Ji Halwai",
      experience: 15,
      location: "Indore, M.P.",
      charges: "₹200–₹400 per plate",
      image: "/halwai1.jphttps://www.shutterstock.com/image-photo/owner-sweet-shop-known-halwai-260nw-2293939647.jpg",
      menu: [
        "Puri", "Dal", "Sabji", "Pulao",
        "Mithai (Nukti, Barfi, Ladoo)"
      ],
    },
    {
      id: 2,
      name: "Gupta Caterers",
      experience: 10,
      location: "Bhopal, M.P.",
      charges: "₹250–₹500 per plate",
      image: "https://c8.alamy.com/comp/2J53KW8/indian-chef-or-halwai-preparing-food-for-devotees-during-navratri-festival-in-india-preparing-food-for-bhandara-or-puja-prasad-2J53KW8.jpg",
      menu: [
        "Puri", "Mix Veg Sabji", "Chole", "Pulao",
        "Mithai (Barfi, Gulab Jamun)"
      ],
    },
    {
      id: 3,
      name: "Joshi Bhojanalay",
      experience: 12,
      location: "Ujjain, M.P.",
      charges: "₹180–₹350 per plate",
      image: "https://c8.alamy.com/comp/F3FG4T/halwai-frying-rabdi-malpua-sweet-in-oil-F3FG4T.jpg",
      menu: [
        "Puri", "Dal Fry", "Paneer Sabji", "Jeera Rice",
        "Mithai (Ladoo, Nukti)"
      ],
    },
  ]

  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={0}
        onCartClick={() => { }}
      />

      {/* Mrityu Bhoj Vendors */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        <motion.h3
          className="text-2xl font-bold text-amber-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Affiliated Mrityu Bhoj / Halwai Vendors
        </motion.h3>

        <motion.p
          className='mb-5 text-gray-700'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Halwai and Caterers are experienced in preparing traditional Bhoj 
          meals for rituals. They provide hygienic and tasty food, ensuring that 
          families can focus on the ceremony without worry. From Puri, Dal, Sabji, 
          and Pulao to sweets like Nukti, Barfi, and Ladoo, everything is arranged 
          with proper care and respect.
        </motion.p>

        {/* Vendor Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } }
          }}
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Left Side Image + Overlay Name */}
              <div className="relative md:w-1/3">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {vendor.name}
                </div>
              </div>

              {/* Right Side Content */}
              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">Experience: {vendor.experience} years</p>
                <p className="text-sm text-gray-600">Location: {vendor.location}</p>
                <p className="text-sm text-green-600 font-semibold">Charges: {vendor.charges}</p>

                {/* Menu */}
                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Menu:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {vendor.menu.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book Mrityu Bhoj Halwai">
                    Book Now
                  </a>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Register Button */}
      <div className="mb-6 mx-5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPopupOpen(true)}
          className="bg-amber-700 hover:bg-amber-800 w-full text-white py-2 px-6 rounded-lg shadow-md"
        >
          Register with us
        </motion.button>
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative mx-2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPopupOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Register as Mrityu Bhoj Vendor</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Business Name" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Location" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Years of Experience" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Charges per Plate" className="w-full p-2 border rounded-lg" />
              <textarea placeholder="Menu Details" className="w-full p-2 border rounded-lg"></textarea>
              <button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-6 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default MrityuBhoj
