"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState("faq")
  
  const faqs = [
    {
      question: "What services does Antim Seva provide?",
      answer: "We provide comprehensive funeral services including Shav Vahan (transportation), Pandit Ji services, complete ritual materials, cremation assistance, and 24/7 emergency support. Our goal is to handle all aspects of the last journey with dignity and respect."
    },
    {
      question: "Are your services available 24/7?",
      answer: (
        <>
          Yes, our emergency helpline (<a href="tel:+919179677292" className="text-amber-600 hover:text-amber-800 font-medium">+91 91796 77292</a>) is available 24 hours a day, 7 days a week. We understand that emergencies can happen at any time, and we're always ready to assist you.
        </>
      )
    },
    {
      question: "What areas do you serve?",
      answer: "We primarily serve Indore and surrounding areas including Bhopal, Ujjain, Dewas, Pithampur, and Mhow. For emergency situations, we can arrange services across Madhya Pradesh and neighboring states."
    },
    {
      question: "How quickly can you arrange services?",
      answer: "We can typically arrange basic services within 1-2 hours of your call. For emergency situations, we prioritize immediate response and can often arrive within 30-45 minutes in Indore city limits."
    },
    {
      question: "What is included in your funeral packages?",
      answer: "Our packages include transportation (Shav Vahan), experienced Pandit Ji, all necessary ritual materials (flowers, incense, wood, etc.), assistance with cremation arrangements, and family support throughout the process."
    },
    {
      question: "Do you provide Pandit Ji for religious ceremonies?",
      answer: "Yes, we have experienced and knowledgeable pandits who can guide and perform all Hindu religious ceremonies according to traditional practices. They are well-versed in Sanskrit mantras and proper rituals."
    },
    {
      question: "What are your payment options?",
      answer: "We accept cash, bank transfers, UPI payments, and credit/debit cards. We understand this is a difficult time, so we offer flexible payment arrangements and can work with your family's needs."
    },
    {
      question: "Can you help with documentation and legal procedures?",
      answer: "Yes, our experienced team can guide you through necessary documentation including death certificates, municipal permissions, and other legal requirements. We aim to reduce the burden on grieving families."
    },
    {
      question: "Do you provide services for different religious communities?",
      answer: "While we specialize in Hindu last rites and ceremonies, we respect all faiths and can coordinate with religious leaders from other communities to ensure appropriate arrangements are made."
    },
    {
      question: "What if I need to transport the deceased to another city?",
      answer: "We provide interstate transportation services with proper documentation and legal compliance. Our vehicles are equipped for long-distance travel and we coordinate with authorities at both ends."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing varies based on the specific services required and location. We offer transparent pricing with no hidden charges. Contact us for a detailed quote based on your specific needs and preferences."
    },
    {
      question: "Can I get a consultation before deciding?",
      answer: (
        <>
          Absolutely! We offer free consultations to understand your specific requirements and explain our services. You can call us at <a href="tel:+919179677292" className="text-amber-600 hover:text-amber-800 font-medium">+91 91796 77292</a> or email <a href="mailto:info@antimseva.in" className="text-amber-600 hover:text-amber-800 font-medium">info@antimseva.in</a> for a detailed discussion.
        </>
      )
    }
  ]

  return (
    <>
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={0}
        onCartClick={() => {}}
      />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="bg-amber-50 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-amber-700">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-4xl ">
              Find answers to common questions about our services
            </p>
            <p className="text-lg text-black mt-4">
              आपके सवालों के जवाब यहाँ मिलेंगे
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-amber-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-green-100 mx-4 rounded-xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Still Have Questions?</h2>
          <p className="text-xl text-black mb-8">
            Our compassionate team is here to help you with any concerns or specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919179677292" 
              className="border border-black bg-white text-black px-8 py-3 rounded-lg font-bold hover:scale-105 duration-150 transition"
            >
              Call Us: +91 91796 77292
            </a>
            <a 
              href="mailto:info@antimseva.in"
              className="border border-black text-black px-8 py-3 rounded-lg font-bold hover:scale-105 duration-150 transition"
            >
              Email Your Question
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="w-full mx-auto px-4">
          <div className="bg-red-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Emergency Assistance</h2>
            <p className="text-xl mb-6">
              For immediate help and urgent assistance, contact our 24/7 emergency helpline
            </p>
            <a 
              href="tel:+919179677292"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-2xl font-bold hover:bg-gray-100 transition"
            >
              📞 +91 91796 77292
            </a>
            <p className="text-lg mt-4">Available round the clock</p>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
