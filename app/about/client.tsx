"use client"

import { Heart, Shield, Clock, MapPin, Phone, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AboutPageClient() {
  const [activeSection, setActiveSection] = useState("about")

  const teamMembers = [
    {
      name: "Vaibhav Malviya",
      designation: "CEO & Founder",
      description: "Ensures smooth coordination of all funeral services with empathy and professionalism.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGcjFbRue-w8A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696228816192?e=2147483647&v=beta&t=wGuIyjx3f-PRFSaMHmpVxJnPcWAwebZvdEcppAkWyEs"
    },
    {
      name: "Anurag Tiwari",
      designation: "Developer",
      description: "Ensures smooth coordination of all funeral services with empathy and professionalism.",
      image: "https://avatars.githubusercontent.com/u/168359424?v=4"
    },
    {
      name: "Pradumn Porwal",
      designation: "Developer",
      description: "Dedicated to helping families during difficult times, available 24/7 for assistance.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HvXCJSBnWAkoS69l00z4WkuLZACEFosgI6BKQgB2Bw&s&ec=73068120"
    },
    {
      name: "Udit Chaturvedi",
      designation: "Social Media Manager",
      description: "Spreading awareness about Antim Seva mission and ensuring families can easily connect with our services online.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HvXCJSBnWAkoS69l00z4WkuLZACEFosgI6BKQgB2Bw&s&ec=73068120"
    },
    {
      name: "Gaurav Peruliya",
      designation: "Field Manager",
      description: "Coordinating on-ground support and ensuring that every ritual and service is delivered with dignity and compassion.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HvXCJSBnWAkoS69l00z4WkuLZACEFosgI6BKQgB2Bw&s&ec=73068120"
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-amber-50 text-black py-10"
        >
          <div className="w-full px-4 text-left">
            <h1 className="text-4xl md:text-5xl text-amber-700 font-bold mb-3">About Antim Seva</h1>
            <p className="text-xl text-black max-w-3xl">
              सम्मान और श्रद्धा के साथ अंतिम संस्कार की सभी आवश्यक सामग्री और सेवाएं
            </p>
          </div>
        </motion.section>

        {/* Our Story */}
        <section className="py-8">
          <div className="w-full mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Antim Seva was founded with a simple yet profound mission: to provide dignified,
                compassionate funeral services during life's most difficult moments. We understand
                that losing a loved one is one of the most challenging experiences a family can face.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                हमारी सेवा का उद्देश्य परिवारों को इस कठिन समय में सहारा देना है। हम धार्मिक
                विधि-विधान के अनुसार सभी आवश्यक सामग्री और सेवाएं प्रदान करते हैं।
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-red-500 mt-1" />
                  <span className="text-gray-700">Provide compassionate support to grieving families</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-500 mt-1" />
                  <span className="text-gray-700">Ensure dignified and respectful funeral services</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-500 mt-1" />
                  <span className="text-gray-700">Available 24/7 for immediate assistance</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-amber-50">
          <div className="w-full mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Our Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[{
                title: "Compassion",
                desc: "We approach every family with empathy, understanding, and genuine care during their time of loss.",
                icon: <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
              }, {
                title: "Dignity",
                desc: "Every service is conducted with the utmost respect and dignity, honoring the memory of your loved one.",
                icon: <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              }, {
                title: "Availability",
                desc: "We're here for you 24/7, ensuring that help is always available when you need it most.",
                icon: <Clock className="w-16 h-16 text-green-500 mx-auto mb-4" />
              }].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-lg p-8 shadow-md hover:scale-105 transition"
                >
                  {item.icon}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="w-full h-full mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
              Our Team
            </h2>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 w-max">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white min-w-[250px] max-w-[250px] rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-amber-900">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.designation}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-green-100 text-black rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-10 text-black">Get in Touch</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Phone className="w-12 h-12 mx-auto mb-4 text-amber-900 hover:scale-105 duration-150" />
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-amber-600">+91 91796 77292</p>
                  <p className="text-sm text-black">Available 24/7</p>
                </div>
                <div className="text-center">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-amber-900 hover:scale-105 duration-150" />
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-amber-600">info@antimseva.in</p>
                  <p className="text-sm text-black">Quick Response</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-amber-900 hover:scale-105 duration-150" />
                  <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-amber-600">Indore, Madhya Pradesh</p>
                  <p className="text-sm text-black">Serving the community</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
