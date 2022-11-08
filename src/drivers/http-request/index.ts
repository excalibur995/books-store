import axios, { AxiosInstance } from "axios";

import { toast } from "react-toastify";
import { GetRequest } from "./entities/request";

export default class RequestServices {
  reqClient: AxiosInstance;
  constructor() {
    const requestHeader = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    this.reqClient = axios.create({
      headers: requestHeader,
    });

    this.reqClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          toast.error("Something went wrong, Please try again later");
        }
        if (error?.response?.status === 403) {
          toast.error("Permission Denied");
        }
        throw error;
      }
    );
  }

  async getRequest<T, K>({ path, params, config }: GetRequest<T>) {
    return await this.reqClient.get<typeof params, K>(path, {
      params,
      ...config,
    });
  }
}
