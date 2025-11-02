import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services - Antim Seva | Shav Vahan, Pandit, Ritual Materials',
  description: 'Complete funeral services including Shav Vahan transportation, experienced pandits, authentic ritual materials, and 24/7 emergency support in Indore.',
  keywords: 'funeral services, shav vahan, pandit services, ritual materials, emergency support, antim sanskar services, Indore funeral services',
  openGraph: {
    title: 'Our Services - Antim Seva',
    description: 'Complete funeral services with dignity and care in Indore',
    url: 'https://antimseva.in/services',
    siteName: 'Antim Seva',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Antim Seva Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Antim Seva',
    description: 'Complete funeral services with dignity and care',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}