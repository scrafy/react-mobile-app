import { ISearchProduct } from "../interfaces/ISearchProduct";


export class SearchProduct implements ISearchProduct{
    
    centerId!: number;
    catalogId?: number | undefined;
    category?: string | undefined;
    nameProduct?: string | undefined;
    ProductsIds?: number[] | undefined;
    
}