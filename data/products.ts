export interface Product {
  id: string
  name: string
  nameHindi?: string
  price: number
  inPackage1?: boolean
  inPackage2?: boolean
  inPackage3?: boolean
  category: string
  description?: string
  image?: string
  available?: boolean
}

export const products: Product[] = [

  {
    id: "1",
    name: "Sutli",
    nameHindi: "सुतली",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Sutli.jpeg",
  },

  {
    id: "2",
    name: "Nada",
    nameHindi: "नाडा",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Nada.jpeg",
  },

  {
    id: "3",
    name: "Rassi",
    nameHindi: "रस्सी",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Rassi.jpeg",
  },

  {
    id: "4",
    name: "Abir-Gulal-Ashtgandh",
    nameHindi: "अबीर-गुलाल-अष्टगंध",
    price: 70,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Abir-Gulal-Ashtgandh.jpeg",
  },

  {
    id: "5",
    name: "Singade-Koni-Makhane",
    nameHindi: "सिंगाडे कोणी मखाने",
    price: 120,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image:"/products/Makhane.jpeg",
  },

  {
    id: "6",
    name: "Jav-Tilli",
    nameHindi: "जव-तिल्ली",
    price: 60,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Jal Tilpatti.jpg",
  },

  {
    id: "7",
    name: "Muthiya",
    nameHindi: "मुठिया",
    price: 300,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "ritual",
  },

  {
    id: "8",
    name: "Itr",
    nameHindi: "इत्र",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "9",
    name: "Nariyal",
    nameHindi: "नारियल",
    price: 20,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Nariyal.jpeg",
  },

  {
    id: "10",
    name: "Kapur",
    nameHindi: "कपुर",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Kapur.png",
  },

  {
    id: "11",
    name: "Agarbatti",
    nameHindi: "अगरबत्ती",
    price: 10,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Agarbatti.jpeg",
  },

  {
    id: "12",
    name: "Munga-Moti",
    nameHindi: "मुंगा मोती",
    price: 210,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Mung Moti.jpg",
  },

  {
    id: "13",
    name: "Panchratna",
    nameHindi: "पंचरत्न",
    price: 250,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Panchratna.jpeg",
  },

  {
    id: "14",
    name: "Matka/Matki",
    nameHindi: "मटका/मटकी",
    price: 80,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Matka.jpg",
  },

  {
    id: "15",
    name: "Kimdi",
    nameHindi: "किमड़ी",
    price: 150,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "16",
    name: "Ghaas",
    nameHindi: "घास",
    price: 100,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Ghaas.jpeg",
  },

  {
    id: "17",
    name: "Baas",
    nameHindi: "बास",
    price: 300,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Baas.jpg",
  },

  {
    id: "18",
    name: "Kafan",
    nameHindi: "कफन",
    price: 300,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Kafan.jpeg",
  },

  {
    id: "19",
    name: "Shaal",
    nameHindi: "शाल",
    price: 100,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
     image: "/products/Shaal.jpeg",
  },

  {
    id: "20",
    name: "Kapde-Kurta-Pajama",
    nameHindi: "कपड़े-कुर्ता-पजामा",
    price: 120,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "21",
    name: "Kapde-Kurta-Dhoti",
    nameHindi: "कपड़े-कुर्ता धोती",
    price: 100,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "clothing",
    image: "/products/Kapde-Kurta-Dhoti.jpeg",
  },

  {
    id: "22",
    name: "Lattha-Dhoti",
    nameHindi: "लटठा धोती",
    price: 80,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "23",
    name: "Matki-Ka-Sten",
    nameHindi: "मटकी का स्टेन",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image:"/products/Matki-Ka-Sten.jpeg",
  },

  {
    id: "24",
    name: "Thali-Lota",
    nameHindi: "थाली-लोटा",
    price: 45,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image: "/products/Thali-Lota.jpeg",
  },

  {
    id: "25",
    name: "Aata",
    nameHindi: "आटा",
    price: 50,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image: "/products/Aata.jpg",
  },

  {
    id: "26",
    name: "Paay",
    nameHindi: "पाए",
    price: 40,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image: "/products/Paay.jpeg",
  },

  {
    id: "27",
    name: "Gopi-Janeu",
    nameHindi: "गोपी-जनेऊ",
    price: 20,
    inPackage1: true,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image: "/products/Gopi-Janeu.jpeg",
  },

  {
    id: "28",
    name: "Maal",
    nameHindi: "माल",
    price: 50,
    inPackage1: true,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "29",
    name: "Chatai",
    nameHindi: "चटाई",
    price: 80,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "essential",
    image: "/products/Chatai.jpg",
  },

  {
    id: "30",
    name: "Dhoop",
    nameHindi: "धूप",
    price: 150,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image:"/products/Dhoop.jpeg",
  },

  {
    id: "31",
    name: "Chandan-Chura",
    nameHindi: "चंदन चुरा",
    price: 370,
    inPackage1: true,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image: "/products/Chandan chura.jpeg",
  },

  {
    id: "32",
    name: "Topi-Safa-Pagdi",
    nameHindi: "टोपी-साफा-पगड़ी",
    price: 150,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
    image:"/products/Safa.jpeg",
  },

   {
    id: "33",
    name: "Ghee",
    nameHindi: "घी",
    price: 600,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Ghee.jpg",
  },

  {
    id: "34",
    name: "Ral",
    nameHindi: "राल",
    price: 480,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
    image: "/products/Ral.jpeg",
  },

  {
    id: "35",
    name: "Swargiya-Sone-Ki-Seedi(polished)",
    nameHindi: "स्वर्गीय सोने की सीढ़ी",
    price: 500,
    inPackage1: true,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
    image:"/products/Swargiya-Sone-Ki-Seedi.jpeg",
  },

  {
    id: "36",
    name: "Swargiya-Chandi-Ki-Seedi",
    nameHindi: "स्वर्गीय चाँदी की सीढ़ी",
    price: 100,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image:"/products/Swargiya-Sone-Ki-Seedi.jpeg",
  },

  {
    id: "37",
    name: "Chandi-Ke-Phool",
    nameHindi: "चाँदी के फूल",
    price: 80,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "38",
    name: "Shilpee",
    nameHindi: "छील्पी",
    price: 550,
    inPackage1: true,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
    image:"/products/Shilpee.jpeg",
  },

  {
    id: "39",
    name: "Suhag-Ka-Saman",
    nameHindi: "सुहाग का सामान",
    price: 150,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "40",
    name: "Vati-Ka-Saman-Bichhdi",
    nameHindi: "वटी का सामान बिछड़ी",
    price: 200,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "41",
    name: "Maharashtrian-Saree",
    nameHindi: "महाराष्ट्रीयन साड़ी",
    price: 180,
    inPackage1: false,
    inPackage2: false,
    inPackage3: true,
    category: "clothing",
    image:"/products/Maharashtrian-Saree.jpeg",
  },

  {
    id: "42",
    name: "Petticoat-Blouse",
    nameHindi: "पेटीकोट-ब्लाउज",
    price: 150,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "43",
    name: "Lugda",
    nameHindi: "लुगड़ा",
    price: 300,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "44",
    name: "Gadi-Takiya",
    nameHindi: "गादी-तकीया",
    price: 300,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "essential",
  },

  {
    id: "45",
    name: "Chaddi-Banian",
    nameHindi: "चड्डी-बनियान",
    price: 100,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "46",
    name: "Towel-Pancha",
    nameHindi: "टॉवेल-पंछा",
    price: 150,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "clothing",
  },

  {
    id: "47",
    name: "Shola",
    nameHindi: "शोला",
    price: 300,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "special",
  },

  {
    id: "48",
    name: "Haldi-Kaku",
    nameHindi: "हल्दी-ककू",
    price: 50,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "49",
    name: "Khopra-Ka-Gola",
    nameHindi: "खोपरा का गोला",
    price: 70,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
  },

  {
    id: "50",
    name: "Barak-Kharak",
    nameHindi: "बरक-खारक",
    price: 50,
    inPackage1: false,
    inPackage2: true,
    inPackage3: true,
    category: "puja",
  },

]

// Basic Kit Items - Funeral Samagri as per user requirements
export const basicKitItems = [
  { name: "सुतली", nameHindi: "सुतली", quantity: "20 नग तार", price: 0 },
  { name: "नाडा", nameHindi: "नाडा", quantity: "150gm", price: 0 },
  { name: "मुझ की रस्सी", nameHindi: "मुझ की रस्सी", quantity: "120gm", price: 0 },
  { name: "सिंघाड़ा", nameHindi: "सिंघाड़ा", quantity: "15 नग", price: 0 },
  { name: "कौड़ी", nameHindi: "कौड़ी", quantity: "100gm", price: 0 },
  { name: "मखाने", nameHindi: "मखाने", quantity: "30gm", price: 0 },
  { name: "जव", nameHindi: "जव", quantity: "150gm", price: 0 },
  { name: "तिल्ली", nameHindi: "तिल्ली", quantity: "150gm", price: 0 },
  { name: "मुठिया", nameHindi: "मुठिया", quantity: "1 नग", price: 0 },
  { name: "अगरबत्ती", nameHindi: "अगरबत्ती", quantity: "1 नग", price: 0 },
  { name: "इत्र", nameHindi: "इत्र", quantity: "1 नग", price: 0 },
  { name: "गुलाल", nameHindi: "गुलाल", quantity: "500 gm", price: 0 },
  { name: "अबीर", nameHindi: "अबीर", quantity: "30gm", price: 0 },
  { name: "घी", nameHindi: "घी", quantity: "1 kg", price: 0 },
  { name: "फूल - माला", nameHindi: "फूल - माला", quantity: "5 नग", price: 0 },
  { name: "कपूर", nameHindi: "कपूर", quantity: "50 gm", price: 0 },
  { name: "पंचरत्न", nameHindi: "पंचरत्न", quantity: "250 gm", price: 250 },
  { name: "मूंगा - मोती", nameHindi: "मूंगा - मोती", quantity: "5 नग", price: 0 },
  { name: "नारियल", nameHindi: "नारियल", quantity: "1 नग", price: 0 },
  { name: "गोल्ड/सिल्वर पॉलिश वाली सीढ़ी", nameHindi: "गोल्ड/सिल्वर पॉलिश वाली सीढ़ी", quantity: "1 नग", price: 0 },
  { name: "कफ़न", nameHindi: "कफ़न", quantity: "1नग", price: 300 },
  { name: "शाल", nameHindi: "शाल", quantity: "1 नग", price: 100 },
  { name: "बॉस", nameHindi: "बॉस", quantity: "1 सेट", price: 300 },
  { name: "घास", nameHindi: "घास", quantity: "100 rs", price: 100 },
  { name: "मटकी काली", nameHindi: "मटकी काली", quantity: "1 नग", price: 0 },
  { name: "मटकी लाल", nameHindi: "मटकी लाल", quantity: "1 नग", price: 0 },
  { name: "किमडी", nameHindi: "किमडी", quantity: "10 लकड़ी", price: 0 },
  { name: "मटकी का स्टेन / तिकोना", nameHindi: "मटकी का स्टेन / तिकोना", quantity: "1 नग", price: 0 },
  { name: "धूप", nameHindi: "धूप", quantity: "250 gm", price: 0 },
  { name: "छीलपि", nameHindi: "छीलपि", quantity: "300gm", price: 0 },
  { name: "चंदन चुरा", nameHindi: "चंदन चुरा", quantity: "150gm", price: 0 },
  { name: "राल", nameHindi: "राल", quantity: "500gm", price: 0 },
  { name: "गोपी", nameHindi: "गोपी", quantity: "1 नग", price: 0 },
  { name: "जनेऊ", nameHindi: "जनेऊ", quantity: "2 नग", price: 0 },
  { name: "तुलसी माला", nameHindi: "तुलसी माला", quantity: "1 नग", price: 0 },
  { name: "गंगाजल", nameHindi: "गंगाजल", quantity: "1 शीशी", price: 0 },
  { name: "आटा", nameHindi: "आटा", quantity: "200gm", price: 0 },
  { name: "कुर्ता पजामा / कुर्ता धोती या साड़ी", nameHindi: "कुर्ता पजामा / कुर्ता धोती या साड़ी", quantity: "1नग", price: 0 }
]

export const basicKit = {
  id: "basic-kit",
  name: "Basic Funeral Kit",
  nameHindi: "मूलभूत अंतिम संस्कार किट",
  basePrice: 5100,
  items: basicKitItems,
  deliveryCharges: {
    local: 100,    // Within city
    regional: 200, // Nearby areas  
    outstation: 300 // Outside city
  },
  category: "funeral-kit",
  description: "Complete funeral samagri kit with all essential items for last rites ceremonies",
  available: true
}

export const packagePricing = {
  package1: {
    name: "Basic Package",
    nameHindi: "मूलभूत पैकेज",
    basePrice: 5100,
    items: products.filter((p) => p.inPackage1),
  },
  package2: {
    name: "Standard Package",
    nameHindi: "मानक पैकेज",
    basePrice: 7500,
    items: products.filter((p) => p.inPackage2),
  },
  package3: {
    name: "Premium Package",
    nameHindi: "प्रीमियम पैकेज",
    basePrice: 11000,
    items: products.filter((p) => p.inPackage3),
  },
}
