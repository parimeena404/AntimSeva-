import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

interface HeroProps {
  setActiveSection?: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  const carouselImages = [
    {
      src: "https://kevinstandagephotography.wordpress.com/wp-content/uploads/2020/05/cover-2.jpg",
      title: "पूर्ण सम्मान के साथ",
      desc: "धार्मिक विधि-विधान के अनुसार सभी आवश्यक सामग्री",
    },
    {
      src: "https://cms.patrika.com/wp-content/uploads/2018/06/14/abna.jpg",
      title: "विश्वसनीय सेवा",
      desc: "हर परिस्थिति में आपके साथ 24/7",
    },
    {
      src: "https://curlytales.com/wp-content/uploads/2022/12/Untitled-design-2022-12-20T115850.427.jpg",
      title: "सेवा भाव",
      desc: "पूर्ण श्रद्धा और सम्मान के साथ",
    },
    {
      src: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/manikarnika-ghat-bernaras-mrutyunjaya-dash.jpg",
      title: "तत्काल सहायता",
      desc: "समय पर और जिम्मेदारी से सेवा",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 leading-tight">
              सम्मान के साथ
              <br />
              <br />
              <span className="text-orange-600">अंतिम विदाई</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
              In times of loss, we stand beside you with dignity and care. From
              ambulance for dead body and antim sanskar services to antyeshti
              services in Indore, funeral management services, and shraddh
              ceremony organization, we ensure seamless arrangements for your
              loved one’s last rites.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">सेवा भाव</h4>
                  <p className="text-sm text-gray-600">पूर्ण श्रद्धा से</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <Clock className="w-8 h-8 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">तत्काल सेवा</h4>
                  <p className="text-sm text-gray-600">24/7 उपलब्ध</p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">विश्वसनीय</h4>
                  <p className="text-sm text-gray-600">गुणवत्ता सुनिश्चित</p>
                </div>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-900 hover:bg-amber-800 text-white px-8 shadow-md hover:shadow-lg transition font-semibold"
                onClick={() => setActiveSection?.("packages")}
              >
                Order Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-900 text-amber-900 hover:bg-amber-50 px-8 bg-transparent font-semibold"
                onClick={() => (window.location.href = "/services")}
              >
                See Services
              </Button>
            </div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-2xl shadow-lg"
          >
            <div
              className="overflow-hidden rounded-2xl shadow-2xl p-4"
              ref={emblaRef}
            >
              <div className="flex">
                {carouselImages.map((item, idx) => (
                  <div className="flex-[0_0_100%] relative mr-2" key={idx}>
                    <img
                      src={item.src}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base opacity-90 drop-shadow-md">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
