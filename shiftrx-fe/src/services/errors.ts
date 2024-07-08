import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorData = {
  message: string;
};

export function isFetchBaseQueryError(
  error: any
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "data" in error;
}

export function isErrorData(data: any): data is ErrorData {
  return typeof data === "object" && data !== null && "message" in data;
}
