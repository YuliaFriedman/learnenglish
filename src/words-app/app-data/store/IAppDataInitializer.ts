import { Category, CategoryType } from "../models/CategoryModel.ts";
import { IAppData } from "../models/AppDataModel.ts";


export interface IAppDataInitializer{
  getData: () => IAppData;
}
