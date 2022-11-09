import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface APIResponse<T> extends APIMeta {
  data: T;
}

export type Response<T> = AxiosResponse<APIResponse<T>>;

export interface GetRequest<T = {}> {
  path: string;
  params?: T;
  config?: AxiosRequestConfig;
}

export interface Hooks<T> {
  params?: T;
  queryId: string;
  onSuccess: (data: any) => void;
}
