export const offlineShops = [
  {
    id: "SH01",
    name: "Rajwada Shop",
    shopkeeperName: "Ram Kumar Sharma",
    address: "Near Rajwada Palace, Indore",
    photo: "https://images.unsplash.com/photo-1556909504-f2216903d3f5?w=300&h=200&fit=crop",
    contact: "+91 98765 43210",
    timings: "8:00 AM - 8:00 PM",
    speciality: "Traditional Ritual Items"
  },
  {
    id: "SH02", 
    name: "Geeta Bhawan",
    shopkeeperName: "Pandit Suresh Joshi",
    address: "MG Road, Near Geeta Bhawan, Indore",
    photo: "https://images.unsplash.com/photo-1518709414923-503fb37b04d6?w=300&h=200&fit=crop",
    contact: "+91 98765 43211",
    timings: "6:00 AM - 9:00 PM",
    speciality: "Religious Books & Puja Items"
  },
  {
    id: "SH03",
    name: "IT Park Shop", 
    shopkeeperName: "Vinod Agarwal",
    address: "Scheme 74, IT Park Area, Indore",
    photo: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop",
    contact: "+91 98765 43212",
    timings: "9:00 AM - 9:00 PM",
    speciality: "Modern & Traditional Items"
  },
  {
    id: "SH04",
    name: "Airport Road Store",
    shopkeeperName: "Manoj Patel", 
    address: "Airport Road, Near Devi Ahilya Airport, Indore",
    photo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop",
    contact: "+91 98765 43213",
    timings: "7:00 AM - 10:00 PM",
    speciality: "Complete Ritual Solutions"
  }
];

export interface OfflineShop {
  id: string;
  name: string;
  shopkeeperName: string;
  address: string;
  photo: string;
  contact: string;
  timings: string;
  speciality: string;
}