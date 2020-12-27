import { IHttpClient } from "./IHttpClient";
import { ITokenService } from "./ITokenService";
import { IStateService } from "./IStateService";
import { ICatalogRepository } from "./repositories/ICatalogRepository";
import { ICenterRepository } from "./repositories/ICenterRepository";
import { IMetaInfoRepository } from "./repositories/IMetaInfoRepository";
import { IOrderRepository } from "./repositories/IOrderRepository";
import { IProductRepository } from "./repositories/IProductRepository";
import { ISellerRepository } from "./repositories/ISellerRepository";
import { IUserRepository } from "./repositories/IUserRepository";
import { ICategoryRepository } from "./repositories/ICategoryRepository";
import { IRouteRepository } from "./repositories/IRouteRepository";
import IState from "./IState";
import ICart from "./ICart";

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
    IStateService,
    IRouteRepository,
    IState,
    ICart    
}