import { ICategory } from "../interfaces/ICategory";

export class Category implements ICategory {

    id!: number;
    categoryName!: string;
    totalProducts!: number;

}