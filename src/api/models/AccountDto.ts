/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransactionDto } from './TransactionDto';

export type AccountDto = {
    id: string;
    transactions?: Array<TransactionDto>;
    createdAt: string;
    updatedAt: string;
    type: string;
    title: string;
};
