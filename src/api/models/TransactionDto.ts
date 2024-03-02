/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountDto } from "./AccountDto";

export type TransactionDto = {
  transactionDate: string;
  account: Array<AccountDto>;
  detail: string;
  extra?: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  desc?: string;
  type: string;
};
