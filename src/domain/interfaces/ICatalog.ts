export interface ICatalog {
    
    id: number,
    name: string,
    totalProducts: number,
    primaryCode: string,
    sellerId: number,
    sellerName: string,
    imageUrl?: string
}