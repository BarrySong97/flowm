/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountDto } from "../models/AccountDto";
import type { CreateAccountDto } from "../models/CreateAccountDto";
import type { UpdateAccountDto } from "../models/UpdateAccountDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { AccountTreeDataDto } from "../models/AccountTreeDataDto";

export class AccountsService {
  /**
   * @returns AccountDto
   * @throws ApiError
   */
  public static accountsControllerFindAll({
    type,
  }: {
    type: string;
  }): CancelablePromise<Array<AccountDto>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/accounts",
      query: {
        type: type,
      },
    });
  }

  public static accountsControllerGetTreeData(): CancelablePromise<AccountTreeDataDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/accounts/treeData",
    });
  }
  /**
   * @returns AccountDto
   * @returns any
   * @throws ApiError
   */
  public static accountsControllerCreate({
    requestBody,
  }: {
    requestBody: CreateAccountDto;
  }): CancelablePromise<AccountDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/accounts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns AccountDto
   * @throws ApiError
   */
  public static accountsControllerDelete({
    id,
  }: {
    id: string;
  }): CancelablePromise<AccountDto> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/accounts/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns AccountDto
   * @throws ApiError
   */
  public static accountsControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateAccountDto;
  }): CancelablePromise<AccountDto> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/accounts/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
