import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ritual Packages - Antim Seva | Complete Last Rites Packages',
  description: 'Choose from our comprehensive ritual packages for complete last rites ceremonies. Authentic materials, quality assured, with both online and offline booking options.',
  keywords: 'ritual packages, last rites packages, antim sanskar packages, puja packages, funeral packages, religious packages, Indore',
  openGraph: {
    title: 'Ritual Packages - Antim Seva',
    description: 'Complete last rites packages with authentic materials and quality assurance',
    url: 'https://antimseva.in/package',
    siteName: 'Antim Seva',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Antim Seva - Ritual Packages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritual Packages - Antim Seva',
    description: 'Complete last rites packages with authentic materials',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}
