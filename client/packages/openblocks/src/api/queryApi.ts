import Api, { HttpMethod } from "./api";
import { DEFAULT_EXECUTE_ACTION_TIMEOUT_MS } from "constants/apiConstants";
import { Property } from "types/entities/common";
import { AxiosPromise } from "axios";
import { JSONValue } from "../util/jsonTypes";

export type PaginationField = "PREV" | "NEXT";

const QUERY_TIMEOUT_BUFFER_MS = 5 * 1000; // 5s

export interface APIRequest {
  requestId?: string;
}

export interface QueryExecuteRequest extends APIRequest {
  applicationId?: string;
  path: string[]; // parentApplicationPath
  queryId?: string;
  params?: Property[];
  paginationField?: PaginationField;
  viewMode: boolean;

  // for query library
  libraryQueryId?: string;
  libraryQueryRecordId?: "latest" | string;
}

export type ActionApiResponseReq = {
  headers: Record<string, string[]>; // user request header
  body?: Record<string, JSONValue>; // user request body
  httpMethod: HttpMethod | "";
  url: string;
};

export type QueryExecuteResponse = {
  code: number;
  success: boolean;
  message: string;
  data: JSONValue;
  runTime: number;
  queryCode: string;

  // body: Record<string, JSONValue> | string; // db query ｜ http response ｜ error message
  // headers: Record<string, string[]>; // api backend header
};

export class QueryApi extends Api {
  static url = "v1/query";

  static executeQuery(
    request: QueryExecuteRequest,
    timeout?: number
  ): AxiosPromise<QueryExecuteResponse> {
    return Api.post(QueryApi.url + "/execute", request, undefined, {
      timeout: timeout ? timeout + QUERY_TIMEOUT_BUFFER_MS : DEFAULT_EXECUTE_ACTION_TIMEOUT_MS,
    });
  }
}
