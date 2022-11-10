import { AxiosResponse } from "axios";
import RequestServices from "drivers/http-request";
import { Book } from "../entities/books.entities";
import { BooksParams } from "../entities/books.entities";

export async function getBookList(params: BooksParams = { size: 10, page: 0 }) {
  try {
    const services = new RequestServices();
    const requestParams = Object.assign({ size: 10, page: 0 }, params);
    const request = await services.getRequest<{}, AxiosResponse<Book[]>>({
      path: "/fee-assessment-books",
      params: requestParams,
    });
    return request.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
