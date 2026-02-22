export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  items: string;
  status: string;
  createdAt: string;
}

export interface SiteSettings {
  site_title?: string;
  site_logo?: string;
  site_favicon?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_address?: string;
  tracking_code?: string;
}
