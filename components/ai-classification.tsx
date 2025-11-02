"use client"

// AI Classification Structure for Backend Integration
export interface AIClassification {
  packages: {
    package_1: {
      name: string
      nameHindi: string
      basePrice: number
      items: string[]
    }
    package_2: {
      name: string
      nameHindi: string
      basePrice: number
      items: string[]
      inherits: string[]
    }
    package_3: {
      name: string
      nameHindi: string
      basePrice: number
      items: string[]
      inherits: string[]
    }
  }
  products: ProductClassification[]
  userOptions: {
    gender: "male" | "female"
    caste: "brahmin" | "non-brahmin" | "others"
    isSeniorCitizen: boolean
  }
  services: ServiceClassification[]
}

interface ProductClassification {
  id: string
  name: string
  nameHindi: string
  price: number
  category: string
  inPackages: string[]
  description?: string
}

interface ServiceClassification {
  id: string
  name: string
  nameHindi: string
  type: "transport" | "manpower" | "ritual" | "consultation"
  basePrice: number
  description: string
}

export const aiClassificationData: AIClassification = {
  packages: {
    package_1: {
      name: "Basic Package",
      nameHindi: "मूलभूत पैकेज",
      basePrice: 1200,
      items: [
        "kafan",
        "nada",
        "rassi",
        "abir-gulal",
        "sigaret-chopi",
        "jal-tilpatti",
        "mundan",
        "jal-kalash",
        "kapur",
        "omkari",
        "mung-moti",
        "panchratna",
        "matki",
        "kimti",
        "paan",
        "kaal",
        "kapas",
        "sheetal",
      ],
    },
    package_2: {
      name: "Standard Package",
      nameHindi: "मानक पैकेज",
      basePrice: 2800,
      items: [
        "matka",
        "kapur-kuli-pajama",
        "matki-ka-nandan",
        "aata",
        "puja-patan-puja",
        "ghee-1kg",
        "tal-sugandh",
        "dhani",
        "chaturmukh-bajrang",
        "laghu",
        "gadi-takiya",
        "chadi-banyan",
        "topi-banyan",
        "sola",
        "hanki-kaju",
        "khopra-ka-gola",
        "barak-kharak",
        "ral",
      ],
      inherits: ["package_1"],
    },
    package_3: {
      name: "Premium Package",
      nameHindi: "प्रीमियम पैकेज",
      basePrice: 5100,
      items: [
        "kapur-kuli-dhoti",
        "lahu-dhoti",
        "mati-lota",
        "papu",
        "gopi-janak",
        "tulsi-mala",
        "chatai",
        "desi-saman-sagai",
        "sugandh-chandan",
        "chandan-pul",
        "suhagan-ka-saman",
        "chandi-ka-saman",
        "mahalakshmi-sagai",
      ],
      inherits: ["package_1", "package_2"],
    },
  },
  products: [
    {
      id: "1",
      name: "Kafan",
      nameHindi: "कफन",
      price: 150,
      category: "essential",
      inPackages: ["package_1", "package_2", "package_3"],
    },
    {
      id: "2",
      name: "Nada",
      nameHindi: "नाड़ा",
      price: 40,
      category: "essential",
      inPackages: ["package_1", "package_2", "package_3"],
    },
    // ... (all products from the spreadsheet)
  ],
  userOptions: {
    gender: "male",
    caste: "brahmin",
    isSeniorCitizen: false,
  },
  services: [
    {
      id: "pandit",
      name: "Pandit Services",
      nameHindi: "पंडित सेवाएं",
      type: "ritual",
      basePrice: 500,
      description: "Experienced pandits for proper ceremonies",
    },
    {
      id: "shav-vahan",
      name: "Shav Vahan",
      nameHindi: "शव वाहन",
      type: "transport",
      basePrice: 1500,
      description: "Professional funeral vehicle service",
    },
    {
      id: "pallbearers",
      name: "Kandha Service",
      nameHindi: "कंधा देने वाले",
      type: "manpower",
      basePrice: 800,
      description: "Professional pallbearer service",
    },
    {
      id: "funeral-band",
      name: "Funeral Band",
      nameHindi: "बैंड पार्टी",
      type: "ritual",
      basePrice: 1200,
      description: "Traditional funeral band service",
    },
  ],
}

// Helper functions for AI integration
export const calculatePackagePrice = (packageId: string): number => {
  return aiClassificationData.packages[packageId as keyof typeof aiClassificationData.packages]?.basePrice || 0
}

export const getPackageItems = (packageId: string): string[] => {
  const pkg = aiClassificationData.packages[packageId as keyof typeof aiClassificationData.packages]
  if (!pkg) return []

  let allItems = [...pkg.items]
  if ("inherits" in pkg) {
    pkg.inherits.forEach((inheritedPkg) => {
      allItems = [...allItems, ...getPackageItems(inheritedPkg)]
    })
  }
  return allItems
}

export const filterProductsByUserOptions = (gender: string, caste: string, isSeniorCitizen: boolean) => {
  // Logic to filter products based on user options
  // This can be customized based on ritual requirements
  return aiClassificationData.products.filter((product) => {
    // Add filtering logic here based on gender, caste, senior citizen status
    return true // For now, return all products
  })
}
