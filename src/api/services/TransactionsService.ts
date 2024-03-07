/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTransactionDto } from "../models/CreateTransactionDto";
import type { UpdateTransactionDto } from "../models/UpdateTransactionDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { TransactionDto } from "../models/TransactionDto";

export class TransactionsService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerCreate({
    requestBody,
  }: {
    requestBody: CreateTransactionDto;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/transactions",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerFindAll(): CancelablePromise<
    Array<TransactionDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/transactions",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerImport({
    requestBody,
  }: {
    requestBody: Array<CreateTransactionDto>;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/transactions/import",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/transactions/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateTransactionDto;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/transactions/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static transactionControllerRemove({
    id,
  }: {
    id: string;
  }): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/transactions/{id}",
      path: {
        id: id,
      },
    });
  }
}
