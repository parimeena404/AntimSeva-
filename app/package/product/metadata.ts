import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Products to Package - Antim Seva | Customize Your Ritual Package',
  description: 'Customize your selected ritual package by adding more products. Browse our complete collection of authentic religious items and materials.',
  keywords: 'add products, customize package, ritual items, religious products, puja materials, antim sanskar items, Indore',
  openGraph: {
    title: 'Add Products to Package - Antim Seva',
    description: 'Customize your ritual package with additional authentic religious items',
    url: 'https://antimseva.in/package/product',
    siteName: 'Antim Seva',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Antim Seva - Customize Package',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Products to Package - Antim Seva',
    description: 'Customize your ritual package with additional authentic items',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}