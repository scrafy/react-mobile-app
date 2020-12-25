import { UnitOfWorkService } from "./UnitOfWorkService";
import { IUserRepository, ISellerRepository, IProductRepository, IOrderRepository, ICenterRepository, ICategoryRepository, ICatalogRepository, IMetaInfoRepository, IRouteRepository } from "../interfaces";
import { RouteRepository, UserRepository, SellerRepository, ProductRepository, OrderRepository, CenterRepository, CategoryRepository, CatalogRepository, MetaInfoRepository } from "../repositories";




export class UnitOfWorkRepository {

    private readonly unitOfWorkService: UnitOfWorkService;
    private userRepository!: IUserRepository;
    private sellerRepository!: ISellerRepository;
    private productRepository!: IProductRepository;
    private orderRepository!: IOrderRepository;
    private centerRepository!: ICenterRepository;
    private categoryRepository!: ICategoryRepository;
    private catalogRepository!: ICatalogRepository;
    private metaInfoRepository!: IMetaInfoRepository;
    private routeRepository!: IRouteRepository;

    constructor() {
        this.unitOfWorkService = new UnitOfWorkService();
    }


    getUserRepository = (singleton: boolean = false): IUserRepository => {

        if (this.userRepository === null || this.userRepository === undefined)
            this.userRepository = new UserRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.userRepository;

        return new UserRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getSellerRepository = (singleton: boolean = false): ISellerRepository => {

        if (this.sellerRepository === null || this.sellerRepository === undefined)
            this.sellerRepository = new SellerRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.sellerRepository;

        return new SellerRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getProductRepository = (singleton: boolean = false): IProductRepository => {

        if (this.productRepository === null || this.productRepository === undefined)
            this.productRepository = new ProductRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.productRepository;

        return new ProductRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getOrderRepository = (singleton: boolean = false): IOrderRepository => {

        if (this.orderRepository === null || this.orderRepository === undefined)
            this.orderRepository = new OrderRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.orderRepository;

        return new OrderRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getCenterRepository = (singleton: boolean = false): ICenterRepository => {

        if (this.centerRepository === null || this.centerRepository === undefined)
            this.centerRepository = new CenterRepository(this.unitOfWorkService.getHttpClientService(false), this.unitOfWorkService.getTokenService(false));

        if (singleton)
            return this.centerRepository;

        return new CenterRepository(this.unitOfWorkService.getHttpClientService(false), this.unitOfWorkService.getTokenService(false));

    }

    getCategoryRepository = (singleton: boolean = false): ICategoryRepository => {

        if (this.categoryRepository === null || this.categoryRepository === undefined)
            this.categoryRepository = new CategoryRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.categoryRepository;

        return new CategoryRepository(this.unitOfWorkService.getHttpClientService(false));
    }

    getCatalogRepository = (singleton: boolean = false): ICatalogRepository => {

        if (this.catalogRepository === null || this.catalogRepository === undefined)
            this.catalogRepository = new CatalogRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.catalogRepository;

        return new CatalogRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getMetaInfoRepository = (singleton: boolean = false): IMetaInfoRepository => {

        if (this.metaInfoRepository === null || this.metaInfoRepository === undefined)
            this.metaInfoRepository = new MetaInfoRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.metaInfoRepository;

        return new MetaInfoRepository(this.unitOfWorkService.getHttpClientService(false));

    }

    getRouteRepository = (singleton: boolean = false): IRouteRepository => {

        if (this.routeRepository === null || this.routeRepository === undefined)
            this.routeRepository = new RouteRepository(this.unitOfWorkService.getHttpClientService(false));

        if (singleton)
            return this.routeRepository;

        return new RouteRepository(this.unitOfWorkService.getHttpClientService(false));

    }
}