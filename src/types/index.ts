// src/types/index.ts
import { ImageSourcePropType } from 'react-native';

export type Category = {
  id: string;
  title: string;
  icon?: React.ReactNode;
};

export type Product = {
  id: string;
  title: string;
  image: any;
  saving?: string;
  labels?: string[];
  rating?: string;
  time?: string;
  stockText?: string;
  price: number;
  mrp: number;
  unitPrice?: string;
  discount?: number;
  quantity?: string;
};

export type Product2 = {
  id: string;
  title: string;
  image: any;

  // BLINKIT STYLE PROPERTIES
  weight?: string; // "150 ml"
  ratingValue?: number; // 4.3
  ratingCount?: number; // 3223
  deliveryTime?: string; // "16 MINS"
  stockAlert?: string; // "Only 1 left"
  offerPercent?: string; // "39% OFF"

  price: number; // selling price
  mrp: number; // original price
  saving?: string;

  unitPrice?: string;

  bgColor?: string;
};
