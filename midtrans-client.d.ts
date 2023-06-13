declare module "midtrans-client";
// declare module "midtrans-client" {
//   export interface TransactionDetails {
//     order_id: string;
//     gross_amount: number;
//   }

//   export interface CustomerDetails {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone: string;
//   }

//   export interface ItemDetails {
//     id: string;
//     price: number;
//     quantity: number;
//     name: string;
//   }

//   export interface ShippingAddress {
//     first_name: string;
//     last_name: string;
//     address: string;
//     city: string;
//     postal_code: string;
//     phone: string;
//     country_code: string;
//   }

//   export interface BillingAddress {
//     first_name: string;
//     last_name: string;
//     address: string;
//     city: string;
//     postal_code: string;
//     phone: string;
//     country_code: string;
//   }

//   export interface CreateTransactionOptions {
//     transaction_details: TransactionDetails;
//     customer_details?: CustomerDetails;
//     item_details?: ItemDetails[];
//     shipping_address?: ShippingAddress;
//     billing_address?: BillingAddress;
//   }

//   export interface SnapTransaction {
//     token: string;
//     redirect_url: string;
//   }

//   export interface ChargeTransactionOptions {
//     transaction_id: string;
//   }

//   export interface RefundTransactionOptions {
//     transaction_id: string;
//     refund_key: string;
//   }

//   export interface CancelTransactionOptions {
//     transaction_id: string;
//   }

//   export interface TransactionStatus {
//     transaction_id: string;
//     order_id: string;
//     gross_amount: string;
//     transaction_status: string;
//   }

//   export interface MidtransClient {
//     new (options: { isProduction: boolean; serverKey: string; clientKey: string });

//     transaction: {
//       create(options: CreateTransactionOptions): Promise<SnapTransaction>;
//       charge(options: ChargeTransactionOptions): Promise<TransactionStatus>;
//       refund(options: RefundTransactionOptions): Promise<TransactionStatus>;
//       cancel(options: CancelTransactionOptions): Promise<TransactionStatus>;
//       status(transactionId: string): Promise<TransactionStatus>;
//     };
//   }
// }
