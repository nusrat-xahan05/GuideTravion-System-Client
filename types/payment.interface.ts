/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TPaymentStatus {
    INITIATED = "INITIATED",
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
}

export interface IPayment {
    _id?: string;
    bookingId: string;

    transactionId: string;          // SSLCommerz tran_id
    validationId?: string;          // val_id from SSLCommerz

    amount: number;
    currency: "BDT";
    status: TPaymentStatus;

    gatewayResponse?: any;           // Raw SSL response (audit/debug)
    paidAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}