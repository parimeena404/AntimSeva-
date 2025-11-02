import { Metadata } from "next"
import { Heart, Shield, Clock, MapPin, Phone, Mail } from "lucide-react"
import AboutPageClient from "./client"

export const metadata: Metadata = {
  title: "About Us - Antim Seva | Our Story & Mission",
  description: "Learn about Antim Seva's mission to provide dignified funeral services with compassion and respect. Our story, values, and commitment to serving families during difficult times.",
  keywords: [
    "About Antim Seva",
    "Our Mission",
    "Funeral Service Company",
    "Company Story",
    "Values",
    "Team",
    "Experience"
  ],
  openGraph: {
    title: "About Antim Seva - Our Mission & Values",
    description: "Dedicated to providing compassionate funeral services with dignity and respect for over years.",
    url: "https://antimseva.in/about",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
