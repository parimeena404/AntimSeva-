"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

function ObituaryServices() {
  const [activeSection, setActiveSection] = useState("services");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const newspapers = [
    {
      id: 1,
      name: "Patrika",
      nameHindi: "पत्रिका",
      location: "Madhya Pradesh & Rajasthan",
      charges: "₹2000 – ₹5000 (depending on size)",
      experience: "Trusted since 1956",
      image:
        "https://rpfs.patrika.com/rp/2023/02/20/PTIndCity/5_01/e9f21dd5_01_mr.jpg",
      services: [
        "Wide circulation in MP & Rajasthan",
        "Quick obituary publishing",
        "Preferred for regional announcements",
      ],
    },
    {
      id: 2,
      name: "Dainik Bhaskar",
      nameHindi: "दैनिक भास्कर",
      location: "North & Central India",
      charges: "₹3000 – ₹7000 (custom packages)",
      experience: "Established readership",
      image:
        "https://www.newspaperkart.com/media/newsletter/Dainik%20Bhaskar-1473587746.jpg",
      services: [
        "High Hindi readership",
        "Dedicated obituary section",
        "Fast processing with regional editions",
      ],
    },
    {
      id: 3,
      name: "Times of India",
      nameHindi: "टाइम्स ऑफ़ इंडिया",
      location: "National Circulation",
      charges: "₹5000 – ₹15,000 (depending on edition)",
      experience: "Leading English daily",
      image: "https://img.etimg.com/photo/103941480.cms",
      services: [
        "National coverage",
        "Premium readership",
        "Trusted English daily",
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

      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        <motion.h3
          className="text-2xl font-bold text-amber-900 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Obituary in Newspaper / शोक संदेश समाचार पत्र में
        </motion.h3>

        <motion.p
          className="mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          We help you publish obituary (Shok Sandesh) in leading newspapers to
          inform relatives, friends, and communities. Choose from Patrika,
          Dainik Bhaskar, Times of India and more with quick publishing and
          regional/national reach.
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
          {newspapers.map((paper) => (
            <motion.div
              key={paper.id}
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
                  src={paper.image}
                  alt={paper.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {paper.name} ({paper.nameHindi})
                </div>
              </div>

              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">
                  Coverage: {paper.location}
                </p>
                <p className="text-sm text-gray-600">
                  Experience: {paper.experience}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Charges: {paper.charges}
                </p>

                <div className="mt-3 flex-grow">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Features:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {paper.services.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a
                    href={`https://wa.me/9179677292?text=I want to publish obituary in ${paper.name}`}
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
              Register as Newspaper Partner
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Newspaper / Business Name"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
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
}

export default ObituaryServices;
