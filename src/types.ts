export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Toy {
  id: string;
  name: string;
  category: 'Wooden Heirlooms' | 'Plush & Companions' | 'STEM & Building' | 'Pretend Play & Music';
  ageGroup: '0-2' | '3-5' | '6-8' | '9+';
  ageLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  tag?: string;
  description: string;
  longDescription: string;
  materials: string[];
  dimensions: string;
  inStock: boolean;
  stockCount: number;
  reviews: Review[];
}

export interface CartItem {
  id: string;
  toy: Toy;
  quantity: number;
  isCustomBundle?: boolean;
  bundleDetails?: {
    boxName: string;
    ribbon: string;
    recipientName: string;
    message: string;
    includedToys: string[];
  };
}

export interface OrderConfirmation {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    giftWrap: boolean;
    giftMessage: string;
    paymentMethod: string;
  };
}
