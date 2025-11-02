"use client"
import React, { useState } from 'react'
import Header from '@/components/header'
import Footer from "@/components/footer"
import { motion } from "framer-motion"

function ShavVahanServices() {
  const [activeSection, setActiveSection] = useState("services")
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Dummy Shav Vahan Provider Data
  const providers = [
{
      id: 1,
      // contact number:"Jitendra Rao-7697672496","Guddu Rao- 9669001897","Mayur Nikkam- 9644553882"
      name: "पार्थ एम्बुलेंस सर्विस",
      experience: 20,
      location: "Indore, M.P.",
      charges: "₹1500 - ₹6000 (as per distance)",
      vehicleNumber: "Available (Multiple Vehicles)",
      // image: "https://5.imimg.com/data5/ANDROID/Default/2023/3/293667104/MK/KG/HO/52309285/product-jpeg-500x500.jpg",
      image:"/Ambulance.jpeg",
      services: [
        "शव वाहन (AC / Non AC)",
        "24x7 सेवा उपलब्ध",
        "फ्रीजर बॉक्स",
        "फूलों से सजावट",
        "लंबी दूरी के लिए वाहन",
        "अनुभवी ड्राइवर एवं समय पर सेवा"
      ],
    },
    {
      id: 2,
      name: "Moksha Yatra Vahan",
      experience: 8,
      location: "Bhopal, M.P.",
      charges: "₹1800",
      vehicleNumber: "MP04 XY 4567",
      image: "https://www.lastjourney.in/uploaded_files/category/whatsapp-image-2024-06-26-at-2.52.04-pm.jpeg",
      services: ["Antim Yatra Vehicle", "Flower Decoration", "24x7 Service"],
    },
    {
      id: 3,
      name: "Shanti Seva Ambulance",
      experience: 6,
      location: "Ujjain, M.P.",
      charges: "₹2000",
      vehicleNumber: "MP13 CD 9876",
      image: "https://goldcoinseva.org/wp-content/uploads/2022/07/Capture-542-780x459-1.jpg",
      services: ["Body Transportation", "Freezer Box", "Antim Sanskar Support"],
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

      {/* Shav Vahan (Ambulance) Service Cards  */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">

        {/* Heading Animation */}
        <motion.h3
          className="text-2xl font-bold text-amber-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Affiliated Shav Vahan / Ambulance Seva Providers
        </motion.h3>

        {/* Paragraph Animation */}
        <motion.p
          className='mb-5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Shav Vahan Ambulance Service is dedicated to providing a dignified and respectful 
          final journey for the departed soul. With timely, safe, and well-organized transportation, 
          we ensure that the deceased is taken to the destination with utmost care. Our trained staff 
          and reliable vehicles are committed to supporting families during this difficult time.
        </motion.p>

        

        {/* Provider Cards with Stagger Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } }
          }}
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
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
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {provider.name}
                </div>
              </div>

              {/* Right Side Content */}
              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">Experience: {provider.experience} years</p>
                <p className="text-sm text-gray-600">Location: {provider.location}</p>
                <p className="text-sm text-gray-600">Vehicle No: {provider.vehicleNumber}</p>
                <p className="text-sm text-green-600 font-semibold">Charges: {provider.charges}</p>

                {/* Services */}
                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Services:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {provider.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book Shav Seva Vahan">
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
            className="bg-amber-700 hover:bg-amber-800  w-full text-white py-2 px-6 rounded-lg shadow-md"
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
            <h3 className="text-xl font-semibold mb-4">Register as Shav Vahan Provider</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Vehicle Number" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Location" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Years of Experience" className="w-full p-2 border rounded-lg" />
              <input type="text" placeholder="Charges" className="w-full p-2 border rounded-lg" />
              <textarea placeholder="Services Offered" className="w-full p-2 border rounded-lg"></textarea>
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

export default ShavVahanServices



