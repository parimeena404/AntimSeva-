import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Antim Seva | 24/7 Funeral Services Indore',
  description: 'Contact Antim Seva for immediate funeral service assistance in Indore. Available 24/7 for emergency situations. Call +91 91796 77292 for compassionate support.',
  keywords: 'contact antim seva, funeral services contact, emergency funeral contact, Indore funeral helpline, 24/7 funeral support',
  openGraph: {
    title: 'Contact Us - Antim Seva',
    description: '24/7 funeral service support in Indore. Call for immediate assistance',
    url: 'https://antimseva.in/contact',
    siteName: 'Antim Seva',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Contact Antim Seva',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Antim Seva',
    description: '24/7 funeral service support in Indore',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}