export interface ICar {
    brand: string;
    model: string;
    year: number;
    price: number;
    category: string;
    description: string;
    quantity: number;
    stock: number;
    imageUrl: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Transaction {
    id: string;
    transactionStatus: string | null;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
  }
  

  export interface Product {
    product: string;
    quantity: number;
    _id: string;
  }


  export interface IOrder {
    transaction: Transaction;
    _id: string;
    user: string;
    products: Product[];
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  