export interface ErrorDto {
  errorCode: string,
  httpStatus: number,
  appErrorMessage: string,
  errorMessage: string,
  timestamp: string,
}