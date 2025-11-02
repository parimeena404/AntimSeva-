"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

const morgueBoxes = [
  {
    id: 1,
    name: "Ice Box",
    nameHindi: "आइस बॉक्स",
    size: "6 feet height, 2.5 feet width",
    usage: "Short duration body preservation",
    image:
      "https://chennaifuneralservices.in/wp-content/uploads/2020/08/Dead-Body-Freezer-Box-Rental-in-Chennai-1024x768.jpg",
    features: [
      "6 feet height and 2.5 feet width",
      "Box can be moved/transported in 2 parts",
      "Portable setup with ice preservation",
    ],
  },
  {
    id: 2,
    name: "Electric Freezer Box",
    nameHindi: "इलेक्ट्रिक फ्रीजर बॉक्स",
    size: "6 feet height, 2.5 feet width",
    usage: "Longer duration body preservation",
    image:
      "https://5.imimg.com/data5/HO/EB/SO/SELLER-6382310/mortuary-dead-body-freezer-box.jpg",
    features: [
      "6 feet height and 2.5 feet width",
      "Box can be moved/transported in 2 parts",
      "Continuous cooling with electricity",
    ],
  },
];

const MorgueBoxServices = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Header
        activeSection="services"
        setActiveSection={() => {}}
        cartItemsCount={0}
        onCartClick={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Morgue Box Services / मॉर्ग बॉक्स सेवाएँ
        </motion.h3>

        <motion.p
          className="mb-5 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          We provide Ice Box and Electric Freezer Box for safe and reliable body
          preservation. Both are designed for ease of transport and effective
          cooling solutions.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {morgueBoxes.map((box) => (
            <motion.div
              key={box.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative md:w-1/3">
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {box.name} ({box.nameHindi})
                </div>
              </div>

              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">Size: {box.size}</p>
                <p className="text-sm text-gray-600">Usage: {box.usage}</p>

                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Features:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {box.features.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book a morgue box service">
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
          className="bg-red-600 hover:bg-red-700 w-full text-white py-2 px-6 rounded-lg shadow-md"
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
            <h3 className="text-xl font-semibold mb-4">
              Register as Morgue Box Provider
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Business Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Years of Experience"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Charges / Packages"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Features Offered"
                className="w-full p-2 border rounded-lg"
              ></textarea>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg w-full sm:w-[300px] block mx-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MorgueBoxServices;
