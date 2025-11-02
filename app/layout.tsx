import "./globals.css"
import { Providers } from "@/app/providers"
import Script from "next/script"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Site Verification */}
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Advent+Pro:ital,wght@0,100..900;1,100..900&family=Cormorant:ital,wght@0,300..700;1,300..700&family=DM+Serif+Text:ital@0;1&family=Francois+One&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=News+Cycle:wght@400;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YG4KQ5XGJE"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YG4KQ5XGJE');
          `}
        </Script>

        {/* ✅ Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Antim Seva",
            "alternateName": ["अंतिम सेवा", "Antim Sewa", "Antim Sanskar Seva"],
            "url": "https://antimseva.in",
            "logo": "https://antimseva.in/products/logo.png",
            "description": "Complete funeral and last journey services in Indore with dignity and respect. Antim sanskar services including Shav Vahan, Pandit Ji, cremation assistance, ritual materials available 24/7.",
            "keywords": "antim seva, funeral services indore, shav vahan, antim sanskar, cremation services, pandit ji services, अंतिम सेवा",
            "sameAs": [
              "https://instagram.com/antimseva"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 91796 77292",
              "contactType": "customer service",
              "areaServed": ["Indore", "Madhya Pradesh", "India"],
              "availableLanguage": ["en", "hi"],
              "hoursAvailable": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main Street",
              "addressLocality": "Indore",
              "addressRegion": "Madhya Pradesh",
              "postalCode": "452001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 22.7196,
              "longitude": 75.8577
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Funeral Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Funeral Services",
                    "description": "Complete funeral arrangements with religious rituals"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Shav Vahan",
                    "description": "Dignified transportation services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Pandit Services",
                    "description": "Religious ceremony guidance"
                  }
                }
              ]
            }
          })}
        </Script>

        {/* ✅ Website Navigation Structure */}
        <Script id="website-navigation" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Antim Seva",
            "url": "https://antimseva.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://antimseva.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "Organization",
              "name": "Antim Seva"
            }
          })}
        </Script>

        {/* ✅ Breadcrumb Navigation */}
        <Script id="breadcrumb-navigation" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://antimseva.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://antimseva.in/about"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Our Services",
                "item": "https://antimseva.in/services"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact Us",
                "item": "https://antimseva.in/contact"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "FAQ",
                "item": "https://antimseva.in/faq"
              }
            ]
          })}
        </Script>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
