import { Product } from './types';

export const WHATSAPP_NUMBER = '+94729399609';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
    category: 'Mouse',
    price: 32500,
    description: 'The world\'s fastest and lightest pro gaming mouse. Designed with the world\'s leading esports pros to win.',
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Sensor': 'HERO 25K',
      'Weight': '<63g',
      'Connectivity': 'LIGHTSPEED Wireless',
      'Battery Life': '70 hours'
    },
    isBestSeller: true,
    isComboDeal: true,
    stockCount: 5,
    stockStatus: 'Low Stock',
    soldThisWeek: 12,
    viewsToday: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    category: 'Keyboard',
    price: 24500,
    description: 'A 75% layout wireless mechanical keyboard with Gateron switches and RGB backlighting.',
    images: ['https://images.unsplash.com/photo-1618384881928-bb3736a94aa2?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Layout': '75%',
      'Switches': 'Gateron Brown',
      'Connectivity': 'Bluetooth / Wired',
      'Battery': '4000mAh'
    },
    isBestSeller: true,
    isBundle: true,
    stockCount: 15,
    stockStatus: 'In Stock',
    soldThisWeek: 8,
    viewsToday: 32,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Samsung 980 Pro 1TB NVMe Gen4 SSD',
    category: 'SSD',
    price: 28500,
    description: 'Unleash the power of the Samsung PCIe 4.0 NVMe SSD 980 PRO for your next-level computing.',
    images: ['https://images.unsplash.com/photo-1597872200370-499df51bb1e0?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Capacity': '1TB',
      'Interface': 'PCIe Gen 4.0 x4',
      'Read Speed': 'Up to 7,000 MB/s',
      'Write Speed': 'Up to 5,000 MB/s'
    },
    isBestSeller: false,
    stockCount: 20,
    stockStatus: 'In Stock',
    soldThisWeek: 5,
    viewsToday: 28,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'ASUS TUF Gaming VG27AQ 27" 165Hz Monitor',
    category: 'Monitor',
    price: 85000,
    description: '27-inch WQHD (2560x1440) IPS gaming monitor with ultra-fast 165Hz refresh rate designed for professional gamers.',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Resolution': '2560 x 1440',
      'Refresh Rate': '165Hz',
      'Panel Type': 'IPS',
      'Response Time': '1ms (MPRT)'
    },
    isBestSeller: true,
    stockCount: 3,
    stockStatus: 'Low Stock',
    soldThisWeek: 4,
    viewsToday: 56,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4 3600MHz',
    category: 'RAM',
    price: 18500,
    description: 'High-performance DDR4 memory illuminates your system with vivid, animated lighting from ten ultra-bright, individually addressable RGB LEDs.',
    images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Capacity': '16GB (2x8GB)',
      'Speed': '3600MHz',
      'Type': 'DDR4',
      'Latency': 'CL18'
    },
    isBestSeller: false,
    stockCount: 12,
    stockStatus: 'In Stock',
    soldThisWeek: 10,
    viewsToday: 22,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Logitech Z623 2.1 Speaker System with THX',
    category: 'Speaker',
    price: 45000,
    description: 'THX-certified 2.1 speaker system delivers gaming-grade audio and the ultimate sound experience for your movies and music.',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop'],
    specs: {
      'Total Watts': '200W (RMS)',
      'Certification': 'THX Certified',
      'Inputs': '3.5mm, RCA',
      'Controls': 'Power, Volume, Bass'
    },
    isBestSeller: false,
    stockCount: 8,
    stockStatus: 'In Stock',
    soldThisWeek: 3,
    viewsToday: 18,
    createdAt: new Date().toISOString()
  }
];
