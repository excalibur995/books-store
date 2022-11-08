import { AxiosResponse } from "axios";
import RequestServices from "drivers/http-request";
import { CatgoryEntities } from "../entitites/category.entities";

export default class CategoryServices extends RequestServices {
  async getCatgeoryList() {
    try {
      const request = await this.getRequest<
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
}
