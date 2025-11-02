"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "क्या आप मृत्यु से पैसा कमा रहे हैं?",
      questionEn: "Are you making money from death?",
      answer:
        "नहीं। हम एक जरूरत को सुलझा रहे हैं। जैसे अस्पताल इलाज के लिए होता है, वैसे ही हम अंतिम संस्कार की तैयारी में परिवार का सहारा बनने के लिए हैं। हमारी सेवाओं का शुल्क केवल लागत और व्यवस्था से जुड़ा है।",
    },
    {
      question: "क्या ये सेवा मजबूरी में फायदा उठाने जैसा नहीं है?",
      questionEn: "Isn't this service taking advantage of people's helplessness?",
      answer:
        "नहीं। हमारा मकसद भावनात्मक रूप से टूटे हुए परिवारों को राहत देना है। जब व्यक्ति दुख में होता है, हम उनके लिए जिम्मेदारी उठाते हैं — ताकि वे अपने प्रियजन को श्रद्धा से विदा कर सकें।",
    },
    {
      question: "क्या सामग्री और सेवाएं महंगी हैं?",
      questionEn: "Are the materials and services expensive?",
      answer:
        "हम पारदर्शिता में विश्वास रखते हैं। हर पैकेज और हर सामान की कीमत पहले से ही स्पष्ट बताई जाती है। आप खुद से चुन सकते हैं कि क्या चाहिए और क्या नहीं। कोई छुपा हुआ चार्ज नहीं।",
    },
    {
      question: "क्या ये सेवा धार्मिक मान्यताओं के अनुसार होती है?",
      questionEn: "Are these services according to religious beliefs?",
      answer:
        "हाँ। हम अनुभवी पंडितों, सामग्रियों और परंपराओं का ध्यान रखते हैं। हिन्दू धर्म के अनुसार हर विधि और सामग्री पूरी श्रद्धा के साथ प्रदान की जाती है।",
    },
    {
      question: "आपकी सेवा किन क्षेत्रों में उपलब्ध है?",
      questionEn: "In which areas are your services available?",
      answer: "अभी हम इंदौर में कार्यरत हैं, लेकिन जल्द ही मध्यप्रदेश और भारत के अन्य शहरों में विस्तार कर रहे हैं।",
    },
    {
      question: "आपातकालीन स्थिति में कितनी जल्दी सेवा मिल सकती है?",
      questionEn: "How quickly can service be provided in emergency situations?",
      answer:
        "हमारी आपातकालीन सेवा 24/7 उपलब्ध है। इंदौर शहर में हम 2 घंटे के अंदर सभी आवश्यक सामग्री पहुंचा देते हैं। आसपास के क्षेत्रों में 4-6 घंटे का समय लग सकता है।",
    },
    {
      question: "क्या आप कस्टम पैकेज बना सकते हैं?",
      questionEn: "Can you create custom packages?",
      answer:
        "हाँ, बिल्कुल। हर परिवार की आवश्यकताएं अलग होती हैं। आप हमसे संपर्क करके अपनी विशेष आवश्यकताओं के अनुसार कस्टम पैकेज बनवा सकते हैं।",
    },
    {
      question: "पेमेंट के क्या विकल्प हैं?",
      questionEn: "What are the payment options?",
      answer:
        "हम सभी प्रकार के पेमेंट स्वीकार करते हैं - कैश, UPI, डेबिट/क्रेडिट कार्ड, नेट बैंकिंग। आपातकालीन स्थिति में पहले सामग्री पहुंचाकर बाद में पेमेंट की सुविधा भी है।",
    },
  ]

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <h3 className="text-2xl font-semibold text-amber-900 mb-6">अक्सर पूछे जाने वाले प्रश्न</h3>
          <p className="text-lg text-gray-600">आपके मन में उठने वाले संवेदनशील प्रश्नों के ईमानदार उत्तर</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.questionEn}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-amber-900" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-amber-900" />
                    )}
                  </div>
                </div>
              </button>

              {openIndex === index && (
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="border-t pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-amber-900">उत्तर:</strong> {faq.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-green-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions? / अभी भी कोई प्रश्न है?</h3>
            <p className="text-gray-600 mb-6">हमारी टीम आपकी हर समस्या का समाधान करने के लिए तैयार है</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
                Call Us: +91 91796 77292
              </button>
              <button className="border border-amber-900 text-amber-900 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors">
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
