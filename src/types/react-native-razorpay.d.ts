declare module "react-native-razorpay" {
  export interface RazorpayOptions {
    description?: string;
    image?: string;
    currency: string;
    key: string;
    amount: number;
    name?: string;
    order_id?: string;

    prefill?: {
      email?: string;
      contact?: string;
      name?: string;
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
      flow?: "intent" | "collect";
    };
  }

  export interface RazorpaySuccess {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayCheckout {
    open(options: RazorpayOptions): Promise<RazorpaySuccess>;
  }

  const RazorpayCheckout: RazorpayCheckout;

  export default RazorpayCheckout;
}