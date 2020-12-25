import { IPaginationData } from "../interfaces/IPaginationData";


export class PaginationData implements IPaginationData {
    
    totalPages!: number;
    currentPage!: number;
    recordsByPage!: number;
    totalRecords!: number;

}