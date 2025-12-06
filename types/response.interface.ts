/* eslint-disable @typescript-eslint/no-explicit-any */
interface TMeta {
    page: number;
    limit: number;
    totalPage: number;
    total: number
}

export type ActionResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
    meta?: TMeta
    errors?: { field: string; message: string }[];
};