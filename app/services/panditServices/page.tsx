"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

function PanditServices() {
  const [activeSection, setActiveSection] = useState("services");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Pandit Data
  const pandits = [
    {
      id: 1,
      // number: "Naman Sharma- "9506150619","8770990398","8319863392",
      name: "पंडित नमन शर्मा",
      age: "N/A",
      experience: "चार पीढ़ियों का अनुभव",
      location: "Indore, M.P.",
      charges: "₹1500-₹3100 (as per ritual)",
      // image: "https://english.onlinekhabar.com/wp-content/uploads/2024/02/pandit-priest.jpg",
      image: "/pandit/Naman Sharma.jpeg",
      description: `प्रियजन, हमारे हिंदू धर्म में संस्कारों का बहुत ही महत्वपूर्ण विधान है। 
      हिंदू धर्म में 16 संस्कार होते हैं, जिनमें सबसे महत्वपूर्ण "अंतिम संस्कार" माना गया है। 
      मैं आपका मित्र पंडित नमन शर्मा, अपनी चार पीढ़ियों के ज्ञान और अनुभव के साथ 
      अंतिम संस्कार की समस्त विधियों को अलग-अलग वर्ण समुदाय एवं शास्त्रों के अनुसार संपन्न करता आ रहा हूं।`,
      services: [
        "अंतिम संस्कार",
        "अस्थि संचय",
        "गरुड़ पुराण",
        "दशगात्र कर्म",
        "एकादशा नारायण बलि कर्म",
        "द्वादशा एवं तेरहवीं",
        "श्राद्ध एवं शास्त्र विधि",
      ],
      extras: [
        "परिवार की सुविधानुसार व्यवस्थाएं",
        "ब्राह्मण भोजन",
        "पूजन सामग्री उपलब्ध",
      ],
    },
    {
      id: 2,
      // number: Mayank Pandit"9165533952","8889121400",
      name: "पंडित इन्द्रानन्द जी शास्त्री",
      age: "N/A",
      experience: "संस्थान आधारित कार्य",
      location: "प्रजापत नगर, द्वारिकापुरी, इंदौर, M.P.",
      charges: "₹1100-₹3100 (as per ritual)",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy7lhmpnQJC_dOdUalgin4kL-6IA_gpNNSHA&s",
      description: `हमारा संस्थान पूजन, साधना, अनुष्ठान एवं ज्योतिष कर्मकांड पर शोध करता है। 
      प्राचीन विद्याओं को आधुनिक समाज तक पहुँचाकर भ्रांतियों का निराकरण करना 
      और सनातनी जनमानस के वैज्ञानिक महत्व को पुनः स्थापित करना हमारा उद्देश्य है।`,
      services: [
        "ज्योतिष एवं कर्मकांड पर शोध",
        "देव, नदी, देववृक्ष का वैज्ञानिक महत्व",
        "पूजन आचार संहिता की व्याख्या",
        "देवदोष, पितृ दोष, ग्रह दोष निवारण",
        "नित्य, नैमितिक एवं काम्य पूजा",
        "कुलदेवी, कुलदेव, क्षेत्रपाल पूजन",
        "पंचोपचार, दशोपचार, षोडशोपचार पूजन",
        "जन्म कुंडली निर्माण एवं परामर्श",
      ],
      extras: ["सनातनी जनमानस की रक्षा", "सनातन राष्ट्र निर्माण में योगदान"],
    },
    {
      id: 3,
      name: " पंडित देवकृष्ण शांडिल  ",
      age: "60",
      experience: "40 वर्ष का अनुभव",
      location: "Indore, M.P.",
      charges: "₹2500 - ₹4000 (as per ritual)",
      image:
        "https://english.onlinekhabar.com/wp-content/uploads/2024/02/pandit-priest.jpg",
      description: `पं. श्री रामकुमार शास्त्री जी पिछले 40 वर्षों से विभिन्न वैदिक अनुष्ठानों एवं 
      धार्मिक कर्मकांडों का संचालन करते आ रहे हैं। 
      वे दुर्गा सप्तशती, गरुड़ पुराण, गायत्री समाज अनुष्ठान और वैष्णव समाज संस्कार 
      जैसे विशेष कार्यों में निपुण हैं।`,
      services: [
        "कर्मकाण्ड पूजा",
        "दुर्गा सप्तशती पाठ",
        "गरुड़ पुराण",
        "गायत्री समाज अनुष्ठान",
        "वैष्णव समाज संस्कार",
        "श्राद्ध एवं अन्य धार्मिक अनुष्ठान",
      ],
      extras: [
        "अनुभवी वैदिक परंपरा",
        "समाज और शास्त्रों के अनुसार विधि",
        "धार्मिक आयोजनों में संपूर्ण सहयोग",
      ],
    },
    {
      id: 4,
      name: "Sanjay Pandit",
      age: 42,
      experience: 4,
      location: "Jabalpur, M.P.",
      charges: "₹2200",
      image:
        "https://english.onlinekhabar.com/wp-content/uploads/2024/02/pandit-priest.jpg",
      services: ["Marriage", "Naamkaran", "Navagrah Shanti", "Vastu Shanti"],
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

      {/* Pandit Ji Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-50">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">
          Our Affiliated Pandit Ji
        </h3>
        <p className="mb-5">
          Our affiliated Pandit Ji provide authentic and traditional guidance
          for all kinds of religious rituals and ceremonies. From pujas, havans,
          and kathas to special rites, they ensure that every ritual is
          performed with devotion and according to Vedic traditions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pandits.map((pandit, index) => (
            <motion.div
              key={pandit.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Left Side Image + Overlay Name */}
              <div className="relative md:w-2/3">
                <img
                  src={pandit.image}
                  alt={pandit.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-sm md:text-base font-semibold px-3 py-1 rounded">
                  {pandit.name}
                </div>
              </div>

              {/* Right Side Content */}
              <div className="p-4 md:w-2/3 flex flex-col flex-grow">
                <p className="text-sm text-gray-600">Age: {pandit.age}</p>
                <p className="text-sm text-gray-600">
                  Location: {pandit.location}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Charges: {pandit.charges}
                </p>

                {/* Services */}
                {pandit.services && (
                  <div className="mt-3 flex-grow">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Services:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {pandit.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Extras */}
                {pandit.extras && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Additional Info:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {pandit.extras.map((extra, idx) => (
                        <li key={idx}>{extra}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description */}
                {pandit.description && (
                  <p className="mt-2 text-sm text-gray-700 italic">
                    {pandit.description}
                  </p>
                )}

                {/* Action */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium self-start"
                >
                  <a href="https://wa.me/9179677292?text=I want to book Pandit Ji">
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
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              Register as Pandit Ji
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Experience (years)"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Services you offer"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Charges"
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </>
  );
}

export default PanditServices;
