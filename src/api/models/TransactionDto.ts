/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { AccountDto } from "./AccountDto";

export type TransactionDto = {
  transactionDate: string;
  fromAccountId: string;
  toAccountId: string;
  from: AccountDto;
  to: AccountDto;
  detail: string;
  extra?: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  desc?: string;
  type: string;
};
