"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

function BandBajaServices() {
  const [activeSection, setActiveSection] = useState("services");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Dummy Band Baja Provider Data
  const providers = [
    {
      id: 1,
      name: "Bobby Band , Indore",
      experience: 15,
      location: "Indore, M.P.",
      charges: "₹2000 - ₹4000",
      contact: "987340XXXX",
      image:
        "https://5.imimg.com/data5/PV/PO/CJ/SELLER-95328874/wedding-band-services-500x500.jpg",
      services: [
        "Wedding Procession",
        "Dhol & Tasha",
        "Brass Instruments",
        "DJ Setup",
        "Uniformed Band Members",
      ],
    },
    {
      id: 2,
      name: "Paras Malwa Band ",
      experience: 10,
      location: "Indore, M.P.",
      charges: "₹3000 - ₹5,000",
      contact: "9876543XXX",
      image:
        "https://millan.co.in/backend/images/admin-service/62ee53fe620381659786238.jpg",
      services: [
        "Ghodi Sawari",
        "Shehnai Performance",
        "Wedding Lights",
        "Musical Band",
        "Traditional Costumes",
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

      {/* Band Baja Vendors Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        {/* Heading */}
        <motion.h3
          className="text-2xl font-bold text-amber-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Affiliated Band Baja Service Providers
        </motion.h3>

        {/* Intro Paragraph */}
        <motion.p
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Band Baja Services bring music, energy, and grandeur to your
          special events. From wedding processions to festive occasions, our
          affiliated bands ensure a vibrant and joyful experience with
          traditional as well as modern instruments.
        </motion.p>

        {/* Provider Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Image + Name Overlay */}
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

              {/* Vendor Details */}
              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">
                  Experience: {provider.experience} years
                </p>
                <p className="text-sm text-gray-600">
                  Location: {provider.location}
                </p>
                <p className="text-sm text-gray-600">
                  Contact: {provider.contact}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Charges: {provider.charges}
                </p>

                {/* Services */}
                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Services:
                  </p>
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
                  <a
                    href={`https://wa.me/91${provider.contact}?text=I want to book ${provider.name} Band Baja`}
                  >
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
            <h3 className="text-xl font-semibold mb-4">
              Register as Band Baja Provider
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Band / Group Name"
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
                placeholder="Charges Range"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Services Offered"
                className="w-full p-2 border rounded-lg"
              ></textarea>
              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white py-2 px-6 rounded-lg"
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
}

export default BandBajaServices;
