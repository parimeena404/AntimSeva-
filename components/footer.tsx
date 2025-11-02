import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const handleNavigation = (path: string) => {
    // For pages that exist as separate routes
    if (['services', 'about', 'faq', 'contact'].includes(path)) {
      window.location.href = `/${path}`
      return
    }

    // For sections on home page (products, packages)
    if (window.location.pathname !== "/") {
      window.location.href = `/#${path}`
      return
    }
    const element = document.getElementById(path)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.dispatchEvent(new CustomEvent("changeSection", { detail: path }))
    }
  }

  return (
    <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 text-white pt-16 pb-10">
      {/* footer for small sreeens  */}
      <div className="md:hidden max-w-7xl mx-auto px-6">
        <div className="">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/products/logo.png"
                alt="Antim Seva Logo"
                className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full shadow-md"
              />
              <div>
                <h3 className="text-2xl font-bold">Antim Seva</h3>
                <p className="text-sm text-amber-200">अंतिम संस्कार सेवा</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              सम्मान और श्रद्धा के साथ अंतिम संस्कार की सभी आवश्यक सामग्री और सेवाएं। आपके कठिन समय में हमारा साथ।
            </p>
          </div>

          <div className="mt-5 justify-center grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4 md:gap-12">
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Contact / संपर्क
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+919179677292"
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
                  <span className="text-sm group-hover:text-amber-200">+91 91796 77292</span>
                </a>
                <a
                  href="mailto:info@antimseva.in"
                  className="flex items-center gap-3 hover:translate-x-1 transition-transform group cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
                  <span className="text-sm group-hover:text-amber-200">info@antimseva.in</span>
                </a>
                <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <MapPin className="w-5 h-5 text-amber-300 mt-1" />
                  <span className="text-sm">
                    123 Main Street, Indore
                    <br />
                    Madhya Pradesh, 452001
                  </span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                  <Clock className="w-5 h-5 text-amber-300" />
                  <span className="text-sm">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden md:block">
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Quick Links / त्वरित लिंक
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
              </h4>
              <ul className="space-y-2">
                {[
                  { id: "products", label: "Products / उत्पाद" },
                  { id: "packages", label: "Packages / पैकेज" },
                  { id: "services", label: "Services / सेवाएं" },
                  { id: "about", label: "About / परिचय" },
                  { id: "contact", label: "Contact / संपर्क" },
                  { id: "faq", label: "FAQ / प्रश्न" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className="text-sm text-amber-100 hover:text-white hover:translate-x-1 transition-all"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Services / सेवाएं
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Ritual Materials / पूजा सामग्री", path: "/package" },
                  { label: "Pandit Services / पंडित सेवा", path: "/services/panditServices" },
                  { label: "Emergency Delivery / आपातकालीन डिलीवरी", path: "/services" },
                  { label: "Shav Vahan Seva / शव वाहन सेवा", path: "/services/shavVahanServices" },
                  { label: "24/7 Support / सहायता", path: "/services/support" },
                ].map((service, i) => (
                  <li key={i} className="hover:translate-x-1 transition-transform">
                    <Link
                      href={service.path}
                      className="text-sm text-amber-100 hover:text-white transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-amber-200 text-center">
              © 2024 Antim Seva. All rights reserved. / सभी अधिकार सुरक्षित।
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-amber-100 hover:text-white hover:underline transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-amber-100 hover:text-white hover:underline transition-all"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* footer for medium/larger screens */}
      <div className=" hidden md:block max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/products/logo.png"
                alt="Antim Seva Logo"
                className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full shadow-md"
              />
              <div>
                <h3 className="text-2xl font-bold">Antim Seva</h3>
                <p className="text-sm text-amber-200">अंतिम संस्कार सेवा</p>
              </div>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed">
              सम्मान और श्रद्धा के साथ अंतिम संस्कार की सभी आवश्यक सामग्री और सेवाएं। आपके कठिन समय में हमारा साथ।
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Contact / संपर्क
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+919179677292"
                className="flex items-center gap-3 hover:translate-x-1 transition-transform group cursor-pointer"
              >
                <Phone className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
                <span className="text-sm group-hover:text-amber-200">+91 91796 77292</span>
              </a>
              <a
                href="mailto:info@antimseva.in"
                className="flex items-center gap-3 hover:translate-x-1 transition-transform group cursor-pointer"
              >
                <Mail className="w-5 h-5 text-amber-300 group-hover:text-amber-200" />
                <span className="text-sm group-hover:text-amber-200">info@antimseva.in</span>
              </a>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <MapPin className="w-5 h-5 text-amber-300 mt-1" />
                <span className="text-sm">
                  123 Main Street, Indore
                  <br />
                  Madhya Pradesh, 452001
                </span>
              </div>
              <div className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                <Clock className="w-5 h-5 text-amber-300" />
                <span className="text-sm">24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links / त्वरित लिंक
              <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
            </h4>
            <ul className="space-y-2">
              {[
                { id: "products", label: "Products / उत्पाद" },
                { id: "packages", label: "Packages / पैकेज" },
                { id: "services", label: "Services / सेवाएं" },
                { id: "about", label: "About / परिचय" },
                { id: "contact", label: "Contact / संपर्क" },
                { id: "faq", label: "FAQ / प्रश्न" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className="text-sm text-amber-100 hover:text-white hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Services / सेवाएं
                <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-amber-400"></span>
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Ritual Materials / पूजा सामग्री", path: "/package" },
                  { label: "Pandit Services / पंडित सेवा", path: "/services/panditServices" },
                  { label: "Emergency Delivery / आपातकालीन डिलीवरी", path: "/services" },
                  { label: "Shav Vahan Seva / शव वाहन सेवा", path: "/services/shavVahanServices" },
                  { label: "24/7 Support / सहायता", path: "/services/support" },
                ].map((service, i) => (
                  <li key={i} className="hover:translate-x-1 transition-transform">
                    <Link
                      href={service.path}
                      className="text-sm text-amber-100 hover:text-white transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-amber-200 text-center">
              © 2024 Antim Seva. All rights reserved. / सभी अधिकार सुरक्षित।
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-amber-100 hover:text-white hover:underline transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-amber-100 hover:text-white hover:underline transition-all"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

