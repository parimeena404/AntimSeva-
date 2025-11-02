import { Heart, Users, Shield, Award } from "lucide-react"

export default function AboutUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main About Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Us / हमारे बारे में</h2>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-red-500" />
            </div>

            <h3 className="text-2xl font-bold text-amber-900 mb-6">एक संवेदनशील संदेश</h3>

            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong className="text-amber-900">"Antim Seva"</strong> सिर्फ एक सेवा नहीं, एक संकल्प है।
              </p>

              <p>
                जब कोई अपनों को खोता है, तो जीवन का सबसे कठिन क्षण होता है। ऐसे समय में हमारे पास सोचने की ताकत नहीं होती कि क्या
                लाना है, कहाँ जाना है, किससे बात करनी है।
              </p>

              <p>
                हम सिर्फ यही चाहते हैं कि उस अंतिम यात्रा में आपको भटकना ना पड़े — सभी सामग्री, सेवाएं और सहायता एक ही स्थान से, सम्मान
                और श्रद्धा के साथ मिले।
              </p>

              <p className="text-xl font-semibold text-amber-900">हमारा उद्देश्य कमाई नहीं, सहारा बनना है।</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">सेवा भाव</h4>
            <p className="text-gray-600 text-sm">पूर्ण श्रद्धा और सम्मान के साथ सेवा</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">सहारा</h4>
            <p className="text-gray-600 text-sm">कठिन समय में परिवार का सहारा</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">विश्वसनीयता</h4>
            <p className="text-gray-600 text-sm">पारदर्शिता और विश्वसनीयता</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">गुणवत्ता</h4>
            <p className="text-gray-600 text-sm">उच्च गुणवत्ता की सामग्री और सेवा</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission / हमारा मिशन</h3>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Our mission"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="text-left">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>धार्मिक परंपराओं का सम्मान करते हुए आधुनिक सुविधा प्रदान करना</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>कठिन समय में परिवारों को भावनात्मक और व्यावहारिक सहारा देना</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>पारदर्शी मूल्य निर्धारण और गुणवत्तापूर्ण सेवा सुनिश्चित करना</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>24/7 उपलब्धता के साथ तत्काल सहायता प्रदान करना</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">अंतिम शब्द</h3>
            <p className="text-xl italic">"हम अंतिम सफर में साथ चलते हैं — श्रद्धा, सम्मान और सेवा भाव से।"</p>
            <p className="mt-4 text-amber-100">
              अगर आप इस सेवा को अपने प्रियजन की याद में किसी और तक पहुंचाना चाहते हैं, तो हमसे जुड़ें।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
