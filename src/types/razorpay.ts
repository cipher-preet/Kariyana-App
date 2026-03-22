export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;

  name?: string;
  description?: string;

  prefill?: {
    contact?: string;
    email?: string;
  };

  theme?: {
    color?: string;
  };

  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
  };

  upi?: {
    flow?: 'intent' | 'collect';
  };
}
