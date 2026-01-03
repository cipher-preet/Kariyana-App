export type Category = {
  id: string;
  title: string;
  icon?: React.ReactNode;
};

export type Product = {
  _id: string;
  name: string;
  images: string;
  quantityPerUnit: number;
  rating?: number;
  reviewCount?: number;
  unit?: string;
  price: number;
  mrp: number;
  marketPrice: number;
  sellingPrice: number;
  sku: number;
  stockStatus?: 'IN_STOCK' | 'LIMITED' | 'OUT';
  subcategoryId: string;
};

export type Product2 = {
  id: string;
  title: string;
  image: any;

  weight?: string;
  ratingValue?: number;
  ratingCount?: number;
  deliveryTime?: string;
  stockAlert?: string;
  offerPercent?: string;

  price: number;
  mrp: number;
  saving?: string;

  unitPrice?: string;

  bgColor?: string;
};
