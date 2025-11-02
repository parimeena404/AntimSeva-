"use client"
import React, { useState } from 'react'
import Header from '@/components/header'
import Footer from "@/components/footer"
import { motion } from "framer-motion"

function CremationGroundServices() {
  const [activeSection, setActiveSection] = useState("services")
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Cremation Grounds Data (Indore Sample)
  const grounds = [
    {
      id: 1,
      name: "Regional Park Muktidham",
      location: "Near Regional Park, Indore, M.P.",
      charges: "₹200 - ₹500 (as per facilities)",
      image: "https://images.bhaskarassets.com/web2images/521/2021/04/12/chitanye_1618247568.jpg",
      facilities: [
        "Traditional Wood Pyre",
        "Asthi Kalash Collection",
        "Waiting Hall",
        "24x7 Availability",
      ]
    },
    {
      id: 2,
      name: "Ram Bagh Mukti dham",
      location: "Ram Bagh, Indore, M.P.",
      charges: "₹250 - ₹600",
      image: "https://img.naidunia.com/naidunia/ndnimg/01042021/01_04_2021-panchkuia_muktidham_31-2-2021.jpg",
      facilities: [
        "Parking Facility",
        "Puja Arrangement",
        "24x7 Availability"
      ]
    },
    {
      id: 3,
      name: "Juni Indore Cremation Ground",
      location: "Juni Indore near Railway Staition, Indore, M.P.",
      charges: "₹150 - ₹400",
      image: "https://img.naidunia.com/naidunia/ndnimg/13042021/13_04_2021-covid_death_13-4-2021.jpg",
      facilities: [
        "Wooden Pyre",
        "Asthi Sanchay",
        "Funeral Material Support"
      ]
    }
  ]

  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={0}
        onCartClick={() => { }}
      />

      {/* Cremation Ground Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">Cremation Grounds in Indore</h3>
        <p className='mb-5'>
          We provide details of all affiliated cremation grounds in Indore. Families can easily 
          find the nearest cremation facility with complete information about services, facilities, 
          and charges for performing the last rites of their loved ones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {grounds.map((ground, index) => (
            <motion.div
              key={ground.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Left Side Image + Overlay Name */}
              <div className="relative md:w-1/3">
                <img
                  src={ground.image}
                  alt={ground.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {ground.name}
                </div>
              </div>

              {/* Right Side Content */}
              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">Location: {ground.location}</p>
                <p className="text-sm text-green-600 font-semibold">Charges: {ground.charges}</p>

                {/* Facilities */}
                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Facilities:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {ground.facilities.map((facility, idx) => (
                      <li key={idx}>{facility}</li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book Cremation Ground Facility">
                    Book Now
                  </a>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Register Button */}
      <div className="flex justify-center my-4 mx-5 ">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFormOpen(true)}
          className="bg-amber-700 hover:bg-amber-800 w-full text-white py-2 px-6 rounded-lg shadow-md"
        >
          Register with us
        </motion.button>
      </div>

      {/* Popup Form */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative mx-2"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-bold"
              onClick={() => setIsFormOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-amber-900 mb-4">Register Cremation Ground</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Cremation Ground Name" className="w-full border p-2 rounded" />
              <input type="text" placeholder="Location" className="w-full border p-2 rounded" />
              <input type="text" placeholder="Charges" className="w-full border p-2 rounded" />
              <textarea placeholder="Facilities Available" className="w-full border p-2 rounded"></textarea>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  )
}

export default CremationGroundServices
