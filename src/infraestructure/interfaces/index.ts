import { IHttpClient } from "./IHttpClient";
import { ITokenService } from "./ITokenService";
import { ILocalStorageService } from "./ILocalStorageService";
import { ICatalogRepository } from "./repositories/ICatalogRepository";
import { ICenterRepository } from "./repositories/ICenterRepository";
import { IMetaInfoRepository } from "./repositories/IMetaInfoRepository";
import { IOrderRepository } from "./repositories/IOrderRepository";
import { IProductRepository } from "./repositories/IProductRepository";
import { ISellerRepository } from "./repositories/ISellerRepository";
import { IUserRepository } from "./repositories/IUserRepository";
import { ICategoryRepository } from "./repositories/ICategoryRepository";
import { IRouteRepository } from "./repositories/IRouteRepository";

export type {    
    IHttpClient,
    ICategoryRepository,
    ITokenService,
    ICatalogRepository,
    ICenterRepository,
    IMetaInfoRepository,
    IOrderRepository,
    IProductRepository,
    ISellerRepository,
    IUserRepository,
    ILocalStorageService,
    IRouteRepository    
}