import { AxiosResponse } from "axios";
import RequestServices from "drivers/http-request";
import { CatgoryEntities } from "../entitites/category.entities";

export async function getCatgeoryList() {
  try {
    const services = new RequestServices();
    const request = await services.getRequest<
      {},
      AxiosResponse<CatgoryEntities[]>
    >({
      path: "/fee-assessment-categories",
    });
    return request.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
