import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 'rice-dal', name: 'চাল ও ডাল', icon: '🌾' },
  { id: 'oil-spice', name: 'তেল ও মসলা', icon: '🧴' },
  { id: 'daily-needs', name: 'দৈনন্দিন ব্যবহার্য পণ্য', icon: '🏠' },
  { id: 'cleaning', name: 'সাবান ও ক্লিনিং আইটেম', icon: '🧼' },
  { id: 'grocery', name: 'নিত্য প্রয়োজনীয় গ্রোসারি', icon: '🛒' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'মিনিকেট চাল (প্রিমিয়াম)',
    price: 3450,
    originalPrice: 3600,
    image: 'https://loremflickr.com/400/400/rice,grain?lock=1',
    category: 'rice-dal',
    unit: '৫০ কেজি',
  },
  {
    id: 2,
    name: 'মসুর ডাল (দেশি)',
    price: 140,
    originalPrice: null,
    image: 'https://loremflickr.com/400/400/lentils,pulses?lock=2',
    category: 'rice-dal',
    unit: '১ কেজি',
  },
  {
    id: 3,
    name: 'রূপচাঁদা সয়াবিন তেল',
    price: 890,
    originalPrice: 920,
    image: 'https://loremflickr.com/400/400/oil,cooking?lock=3',
    category: 'oil-spice',
    unit: '৫ লিটার',
  },
  {
    id: 4,
    name: 'রাঁধুনী গুড়া মরিচ',
    price: 120,
    originalPrice: null,
    image: 'https://loremflickr.com/400/400/chili,spice?lock=4',
    category: 'oil-spice',
    unit: '২০০ গ্রাম',
  },
  {
    id: 5,
    name: 'লাক্স সাবান (সফট টাচ)',
    price: 75,
    originalPrice: null,
    image: 'https://loremflickr.com/400/400/soap,beauty?lock=5',
    category: 'cleaning',
    unit: '১০০ গ্রাম',
  },
  {
    id: 6,
    name: 'হুইল পাউডার',
    price: 110,
    originalPrice: null,
    image: 'https://loremflickr.com/400/400/detergent,powder?lock=6',
    category: 'cleaning',
    unit: '১ কেজি',
  },
  {
    id: 7,
    name: 'ডানো ফুল ক্রিম মিল্ক পাউডার',
    price: 850,
    originalPrice: 880,
    image: 'https://loremflickr.com/400/400/milk,powder?lock=7',
    category: 'grocery',
    unit: '৫০০ গ্রাম',
  },
  {
    id: 8,
    name: 'চিনি (সাদা)',
    price: 135,
    originalPrice: null,
    image: 'https://loremflickr.com/400/400/sugar,white?lock=8',
    category: 'grocery',
    unit: '১ কেজি',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'রহিম আহমেদ',
    comment: 'মাসিক বাজারের সার্ভিস খুবই ভালো। চাল এবং তেলের মান নিয়ে আমি সন্তুষ্ট।',
    rating: 5,
    image: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: 2,
    name: 'সাদিয়া ইসলাম',
    comment: 'অফিস থেকে ফিরে বাজার করার সময় পাই না, মাসিবাজার আমার জীবন সহজ করে দিয়েছে।',
    rating: 5,
    image: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: 3,
    name: 'আব্দুল্লাহ আল মামুন',
    comment: 'প্যাকেজিং এবং ডেলিভারি স্পিড অসাধারণ। ধন্যবাদ মাসিবাজার।',
    rating: 4,
    image: 'https://picsum.photos/seed/user3/100/100',
  },
];
