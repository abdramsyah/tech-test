import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface SuccessResponseType<T, D = any> extends AxiosResponse {
  data: {
    data: T;
  };
  config: InternalAxiosRequestConfig<D>;
}

export type TableType<T> = {
  currenPage: number;
  pageSize: number;
  lastPage: number;
  countAllData: number;
  pages: number[];
  data: T;
};

export interface ErrorResponseType<T = any, D = any> extends AxiosError {
  config?: InternalAxiosRequestConfig<D>;
  response?: AxiosResponse<T, D>;
}
