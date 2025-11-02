"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

const TentHouseServices = () => {
  const [activeSection, setActiveSection] = useState("services");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const tentVendors = [
    {
      id: 1,
      name: "Sharma Tent House",
      experience: 20,
      location: "Indore, M.P.",
      charges: "₹5000 – ₹50,000 (depending on event)",
      image:
        "https://content.jdmagicbox.com/comp/damoh/v5/9999p7812.7812.111217134109.n4v5/catalogue/amit-tent-house-tendukheda-damoh-tent-house-1q3tfcuxvy.jpg",
      services: [
        "Shamiyana Setup",
        "Lighting & Decoration",
        "Seating Arrangements",
        "Stage & Mandap Setup",
      ],
    },
    {
      id: 2,
      name: "Gupta Decorators & Tent",
      experience: 15,
      location: "Indore, M.P.",
      charges: "₹5,000 – ₹60,000 (custom packages)",
      image:
        "https://images.jdmagicbox.com/quickquotes/images_main/customised-tent-house-2216808709-sck3sbl5.jpg",
      services: [
        "Tent & Canopy",
        "Flower Decoration",
        "Sound & Lighting",
        "Dining Setup",
      ],
    },
    {
      id: 3,
      name: "Joshi Tent & Events",
      experience: 12,
      location: "Indore, M.P.",
      charges: "₹10,000 – ₹40,000",
      image:
        "https://media.istockphoto.com/id/599133022/photo/wedding-hall.jpg?s=612x612&w=0&k=20&c=4mG0FFcdc_jOoEMS_V7VT4WYrerO4FvNqaDxx4icb9k=",
      services: [
        "Complete Wedding Tent",
        "Stage Decoration",
        "Lighting Arrangements",
        "Chairs & Tables",
      ],
    },
  ];

  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={0}
        onCartClick={() => {}}
      />

      {/* Tent House Vendors */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-blue-50">
        <motion.h3
          className="text-2xl font-bold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Tent House & Decoration Vendors
        </motion.h3>

        <motion.p
          className="mb-5 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Tent House vendors provide complete solutions for weddings,
          rituals and events. From Shamiyana setup to stage decoration,
          lighting, and seating, everything is arranged with care and
          professionalism.
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
          {tentVendors.map((vendor) => (
            <motion.div
              key={vendor.id}
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
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {vendor.name}
                </div>
              </div>

              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">
                  Experience: {vendor.experience} years
                </p>
                <p className="text-sm text-gray-600">
                  Location: {vendor.location}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Charges: {vendor.charges}
                </p>

                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Services:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {vendor.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book Tent House Vendor">
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
              Register as Tent House Vendor
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
              <textarea
                placeholder="Services Offered"
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

export default TentHouseServices;
