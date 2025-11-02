"use client"
import React, { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

function DeathCertificateForm() {
  const [activeSection, setActiveSection] = useState("services")
  const [formData, setFormData] = useState({
    applicantName: "",
    relationWithDeceased: "",
    applicantAddress: "",
    mobileNumber: "",
    email: "",
    deceasedName: "",
    gender: "",
    dateOfDeath: "",
    placeOfDeath: "",
    addressOfDeceased: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    religion: "",
    hospitalName: "",
    informantName: "",
    informantAddress: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Construct WhatsApp message
    const message = `
*Death Certificate Request Form Details*

👤 Applicant Name: ${formData.applicantName}
Relation with Deceased: ${formData.relationWithDeceased}
📍 Applicant Address: ${formData.applicantAddress}
📞 Mobile: ${formData.mobileNumber}
📧 Email: ${formData.email}

🕊️ Deceased Name: ${formData.deceasedName}
Gender: ${formData.gender}
Date of Death: ${formData.dateOfDeath}
Place of Death: ${formData.placeOfDeath}
🏠 Address of Deceased: ${formData.addressOfDeceased}
👨 Father Name: ${formData.fatherName}
👩 Mother Name: ${formData.motherName}
💍 Spouse Name: ${formData.spouseName}
🕉️ Religion: ${formData.religion}
🏥 Hospital Name: ${formData.hospitalName}

📌 Informant Name: ${formData.informantName}
📍 Informant Address: ${formData.informantAddress}
    `
    const phone = "9179677292" // <-- Replace with your WhatsApp number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={0}
        onCartClick={() => {}}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          Death Certificate Application Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          {/* Applicant Details */}
          <h3 className="font-semibold text-lg text-amber-800">Applicant Details</h3>
          <input type="text" name="applicantName" placeholder="Applicant Full Name" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="relationWithDeceased" placeholder="Relation with Deceased" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="applicantAddress" placeholder="Applicant Address" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="number" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Deceased Details */}
          <h3 className="font-semibold text-lg text-amber-800 mt-6">Deceased Details</h3>
          <input type="text" name="deceasedName" placeholder="Deceased Full Name" onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="gender" onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="date" name="dateOfDeath" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="placeOfDeath" placeholder="Place of Death" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="addressOfDeceased" placeholder="Deceased Address" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="fatherName" placeholder="Father's Name" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="motherName" placeholder="Mother's Name" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="spouseName" placeholder="Spouse Name (if any)" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="religion" placeholder="Religion" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="hospitalName" placeholder="Hospital Name (if applicable)" onChange={handleChange} className="w-full border p-2 rounded" />

          {/* Informant Details */}
          <h3 className="font-semibold text-lg text-amber-800 mt-6">Informant Details</h3>
          <input type="text" name="informantName" placeholder="Informant Name" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="informantAddress" placeholder="Informant Address" onChange={handleChange} className="w-full border p-2 rounded" required />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Submit & Send to WhatsApp
          </motion.button>
        </form>

        {/* Disclaimer Section */}
        <div className="mt-8 bg-amber-50 p-4 rounded-lg text-sm text-gray-700">
          <p>
            <strong>Note:</strong> After submitting the form, you will receive a call from our team for confirmation.  
            We will only assist you in filling and submitting the required details for the death certificate.  
            We have no direct involvement with the cremation ground. A certificate will be issued which we will help process, ensuring that the family does not face any inconvenience.
            for more details you can visit <a className="text-blue-500 font-semibold" href="https://www.mpenagarpalika.gov.in/irj/portal/anonymous/CitizenServices/DeathCertificate/qlDeathCertificates?guest_user=anony1">MP Govt Website for Death Certificate </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DeathCertificateForm
