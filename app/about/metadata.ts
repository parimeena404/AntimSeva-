import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Antim Seva | Professional Funeral Services in Indore',
  description: 'Learn about Antim Seva, a trusted provider of dignified funeral services in Indore. Our mission is to provide compassionate support during difficult times with professional last rites services.',
  keywords: 'about antim seva, funeral service provider, Indore funeral company, professional funeral services, compassionate care',
  openGraph: {
    title: 'About Us - Antim Seva',
    description: 'Trusted provider of dignified funeral services in Indore',
    url: 'https://antimseva.in/about',
    siteName: 'Antim Seva',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'About Antim Seva',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Antim Seva',
    description: 'Trusted provider of dignified funeral services',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}