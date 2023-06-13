export interface Product {
  specs: {
    chipset: string;
    ram: string;
    storage: string;
    battery: string;
    os: string;
    size: string;
    camera: string;
  };
  _id: string;
  brand: string;
  model: string;
  releaseDate: string;
  description: string;
  images: string;
  price: number;
  new?: boolean;
  recommended?: boolean;
}

export interface Cart {
  _id: string;
  user: string;
  product: Product;
  quantity: number;
  price: number;
}
[];

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerBillingAndShipping {
  address: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface Transaction {
  _id: string;
  orderDetails: {
    credit_cart: { secure: boolean };
    customer_details: {
      user_id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
      billing_address: CustomerBillingAndShipping;
      shipping_address: CustomerBillingAndShipping;
    };
    item_details: [
      {
        id: string;
        name: string;
        price: number;
        quantity: number;
      }
    ];
    transaction_details: {
      gross_amount: number;
      order_id: string;
    };
  };
  token: string;
  details: {
    issuer: string;
    transaction_code: string;
    transaction_status: string;
  };
  createdAt: string;
  updatedAt: string;
}
