import { UnitOfWorkRepository, UnitOfWorkService } from "../../infraestructure/unitsofwork";
import { IGetCenterCatalogsUseCase, IGetCategoriesUseCase, IAssociateAccountToCentreCodeUseCase,  IGetUserCentersUseCase, IGetApkVersions, IGetCurrentApkVersion, IConfirmOrderUseCase, IGetOrdersDoneUseCase, IAddProductToFavoriteListUseCase, IDeleteProductFromFavoriteListUseCase, IGetProductsFromFavoriteListUseCase, ISearchProductsUseCase, IChangePasswordUseCase, ICreateAccountUseCase, IGetFavoriteProductsUseCase, ILoginUseCase, IRecoverPasswordUseCase, IGetSellersUseCase, IGetOrderTotalSummaryUseCase, ICheckProductBelongToCenterUseCase, ISearchSubsetProductsUseCase, IGetCenterDeliveryDaysUseCase, IGetCategoriesByCentreUseCase, ICheckUserEmailUseCase, ICreateIncidenceUseCase } from "../../application/interfaces"
import { ISellerRepository } from "../../infraestructure/interfaces";
import { GetCenterCatalogsUseCase, CreateIncidenceUseCase, GetCategoriesUseCase, AssociateAccountToCentreCodeUseCase,  GetUserCentersUseCase, GetApkVersions, GetCurrentApkVersion, ConfirmOrderUseCase, GetOrdersDoneUseCase, GetOrderTotalSummary, AddProductToFavoriteListUseCase, DeleteProductFromFavoriteListUseCase, GetProductsFromFavoriteListUseCase, SearchProductUseCase, GetSellersUseCase, ChangePasswordUseCase, CreateAccountUseCase, GetFavoriteProductsUseCase, LoginUseCase, RecoverPasswordUseCase, CheckProductBelongToCenterUseCase, SearchSubsetProductsUseCase, GetCenterDeliveryDaysUseCase, GetCategoriesByCentreUseCase } from "../../application/usecases";
import { CheckUserEmailUseCase } from "../usecases/userUseCases/CheckUserEmailUseCase";


export class UnitOfWorkUseCase {

    private readonly unitOfWorkRepository: UnitOfWorkRepository;
    private readonly unitOfWorkService: UnitOfWorkService;
    private centerCatalogUseCase!: IGetCenterCatalogsUseCase;
    private categoriesUseCase!: IGetCategoriesUseCase
    private associateAccountToCentreCodeUseCase!: IAssociateAccountToCentreCodeUseCase
    private userCentersUseCase!: IGetUserCentersUseCase
    private apkVersionsUseCase!: IGetApkVersions
    private apkCurrentVersionUseCase!: IGetCurrentApkVersion
    private confirmOrderUseCase!: IConfirmOrderUseCase
    private ordersDoneUseCase!: IGetOrdersDoneUseCase
    private orderTotalSummaryUseCase!: IGetOrderTotalSummaryUseCase
    private addProductToFavoriteListUseCase!: IAddProductToFavoriteListUseCase
    private deleteProductFromFavoriteListUseCase!: IDeleteProductFromFavoriteListUseCase
    private productsFromFavoriteListUseCase!: IGetProductsFromFavoriteListUseCase
    private searchProductUseCase!: ISearchProductsUseCase
    private sellersUseCase!: ISellerRepository
    private changePasswordUseCase!: IChangePasswordUseCase
    private checkUserEmailUseCase!: ICheckUserEmailUseCase
    private createAccountUseCase!: ICreateAccountUseCase
    private getFavoriteProductsUseCase!: IGetFavoriteProductsUseCase
    private loginUseCase!: ILoginUseCase
    private recoverPasswordUseCase!: IRecoverPasswordUseCase
    private productBelongToCenter!: ICheckProductBelongToCenterUseCase
    private searchSubsetProductUseCase!: ISearchSubsetProductsUseCase
    private centerDeliveryDaysUseCase!: IGetCenterDeliveryDaysUseCase
    private categoriesByCenterUseCase!: IGetCategoriesByCentreUseCase
    private createIncidenceUseCase!: ICreateIncidenceUseCase



    constructor() {
        this.unitOfWorkRepository = new UnitOfWorkRepository();
        this.unitOfWorkService = new UnitOfWorkService();
    }

    getProductBelongToCenterUseCase = (singleton = false): ICheckProductBelongToCenterUseCase => {

        if (this.productBelongToCenter === null || this.productBelongToCenter === undefined)

            this.productBelongToCenter = new CheckProductBelongToCenterUseCase(this.unitOfWorkRepository.getCenterRepository(false))

        if (singleton)
            return this.productBelongToCenter;

        return new CheckProductBelongToCenterUseCase(this.unitOfWorkRepository.getCenterRepository(false));
    }

    getCreateIncidenceUseCase = (singleton = false): ICreateIncidenceUseCase => {

        if (this.createIncidenceUseCase === null || this.createIncidenceUseCase === undefined)

            this.createIncidenceUseCase = new CreateIncidenceUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.createIncidenceUseCase;

        return new CreateIncidenceUseCase(this.unitOfWorkRepository.getUserRepository(false));
    }

    getCenterCatalogUseCase = (singleton = false): IGetCenterCatalogsUseCase => {

        if (this.centerCatalogUseCase === null || this.centerCatalogUseCase === undefined)

            this.centerCatalogUseCase = new GetCenterCatalogsUseCase(this.unitOfWorkRepository.getCatalogRepository(false))

        if (singleton)
            return this.centerCatalogUseCase;

        return new GetCenterCatalogsUseCase(this.unitOfWorkRepository.getCatalogRepository(false));
    }

    getCategoriesUseCase = (singleton = false): IGetCategoriesUseCase => {

        if (this.categoriesUseCase === null || this.categoriesUseCase === undefined)

            this.categoriesUseCase = new GetCategoriesUseCase(this.unitOfWorkRepository.getCategoryRepository(false))

        if (singleton)
            return this.categoriesUseCase;

        return new GetCategoriesUseCase(this.unitOfWorkRepository.getCategoryRepository(false));
    }

    getCategoriesByCentreUseCase = (singleton = false): IGetCategoriesByCentreUseCase => {

        if (this.categoriesByCenterUseCase === null || this.categoriesByCenterUseCase === undefined)

            this.categoriesByCenterUseCase = new GetCategoriesByCentreUseCase(this.unitOfWorkRepository.getCategoryRepository(false))

        if (singleton)
            return this.categoriesByCenterUseCase;

        return new GetCategoriesByCentreUseCase(this.unitOfWorkRepository.getCategoryRepository(false));
    }

    getAssociateAccountToCentreCodeUseCase = (singleton = false): IAssociateAccountToCentreCodeUseCase => {

        if (this.associateAccountToCentreCodeUseCase === null || this.associateAccountToCentreCodeUseCase === undefined)

            this.associateAccountToCentreCodeUseCase = new AssociateAccountToCentreCodeUseCase(this.unitOfWorkRepository.getCenterRepository(false))

        if (singleton)
            return this.associateAccountToCentreCodeUseCase;

        return new AssociateAccountToCentreCodeUseCase(this.unitOfWorkRepository.getCenterRepository(false));
    }

    getUserCentersUseCase = (singleton = false): IGetUserCentersUseCase => {

        if (this.userCentersUseCase === null || this.userCentersUseCase === undefined)

            this.userCentersUseCase = new GetUserCentersUseCase(this.unitOfWorkRepository.getCenterRepository(false))

        if (singleton)
            return this.userCentersUseCase;

        return new GetUserCentersUseCase(this.unitOfWorkRepository.getCenterRepository(false));
    }

    getApkVersionsUseCase = (singleton = false): IGetApkVersions => {

        if (this.apkVersionsUseCase === null || this.apkVersionsUseCase === undefined)

            this.apkVersionsUseCase = new GetApkVersions(this.unitOfWorkRepository.getMetaInfoRepository(false))

        if (singleton)
            return this.apkVersionsUseCase;

        return new GetApkVersions(this.unitOfWorkRepository.getMetaInfoRepository(false));
    }

    getCurrentApkVersionUseCase = (singleton = false): IGetCurrentApkVersion => {

        if (this.apkCurrentVersionUseCase === null || this.apkCurrentVersionUseCase === undefined)

            this.apkCurrentVersionUseCase = new GetCurrentApkVersion(this.unitOfWorkRepository.getMetaInfoRepository(false))

        if (singleton)
            return this.apkCurrentVersionUseCase;

        return new GetCurrentApkVersion(this.unitOfWorkRepository.getMetaInfoRepository(false));
    }

    getConfirmOrderUseCase = (singleton = false): IConfirmOrderUseCase => {

        if (this.confirmOrderUseCase === null || this.confirmOrderUseCase === undefined)

            this.confirmOrderUseCase = new ConfirmOrderUseCase(this.unitOfWorkRepository.getOrderRepository(false))

        if (singleton)
            return this.confirmOrderUseCase;

        return new ConfirmOrderUseCase(this.unitOfWorkRepository.getOrderRepository(false));
    }

    getOrdersDoneUseCase = (singleton = false): IGetOrdersDoneUseCase => {

        if (this.ordersDoneUseCase === null || this.ordersDoneUseCase === undefined)

            this.ordersDoneUseCase = new GetOrdersDoneUseCase(this.unitOfWorkRepository.getOrderRepository(false))

        if (singleton)
            return this.ordersDoneUseCase;

        return new GetOrdersDoneUseCase(this.unitOfWorkRepository.getOrderRepository(false));
    }

    getOrderTotalSummaryUseCase = (singleton = false): IGetOrderTotalSummaryUseCase => {

        if (this.orderTotalSummaryUseCase === null || this.orderTotalSummaryUseCase === undefined)

            this.orderTotalSummaryUseCase = new GetOrderTotalSummary(this.unitOfWorkRepository.getOrderRepository(false))

        if (singleton)
            return this.orderTotalSummaryUseCase;

        return new GetOrderTotalSummary(this.unitOfWorkRepository.getOrderRepository(false));
    }

    getAddProductToFavoriteListUseCase = (singleton = false): IAddProductToFavoriteListUseCase => {

        if (this.addProductToFavoriteListUseCase === null || this.addProductToFavoriteListUseCase === undefined)

            this.addProductToFavoriteListUseCase = new AddProductToFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false))

        if (singleton)
            return this.addProductToFavoriteListUseCase;

        return new AddProductToFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false));

    }

    getDeleteProductFromFavoriteListUseCase = (singleton = false): IDeleteProductFromFavoriteListUseCase => {

        if (this.deleteProductFromFavoriteListUseCase === null || this.deleteProductFromFavoriteListUseCase === undefined)

            this.deleteProductFromFavoriteListUseCase = new DeleteProductFromFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false))

        if (singleton)
            return this.deleteProductFromFavoriteListUseCase;

        return new DeleteProductFromFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false));

    }

    getProductsFromFavoriteListUseCase = (singleton = false): IGetProductsFromFavoriteListUseCase => {

        if (this.productsFromFavoriteListUseCase === null || this.productsFromFavoriteListUseCase === undefined)

            this.productsFromFavoriteListUseCase = new GetProductsFromFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false))

        if (singleton)
            return this.productsFromFavoriteListUseCase;

        return new GetProductsFromFavoriteListUseCase(this.unitOfWorkRepository.getProductRepository(false));

    }

    getSearchProductUseCase = (singleton = false): ISearchProductsUseCase => {

        if (this.searchProductUseCase === null || this.searchProductUseCase === undefined)

            this.searchProductUseCase = new SearchProductUseCase(this.unitOfWorkRepository.getProductRepository(false))

        if (singleton)
            return this.searchProductUseCase;

        return new SearchProductUseCase(this.unitOfWorkRepository.getProductRepository(false));

    }

    getSearchSubsetProductUseCase = (singleton = false): ISearchSubsetProductsUseCase => {

        if (this.searchSubsetProductUseCase === null || this.searchSubsetProductUseCase === undefined)

            this.searchSubsetProductUseCase = new SearchSubsetProductsUseCase(this.unitOfWorkRepository.getProductRepository(false))

        if (singleton)
            return this.searchSubsetProductUseCase;

        return new SearchSubsetProductsUseCase(this.unitOfWorkRepository.getProductRepository(false));

    }

    getSellersUseCase = (singleton = false): IGetSellersUseCase => {

        if (this.sellersUseCase === null || this.sellersUseCase === undefined)

            this.sellersUseCase = new GetSellersUseCase(this.unitOfWorkRepository.getSellerRepository(false))

        if (singleton)
            return this.sellersUseCase;

        return new GetSellersUseCase(this.unitOfWorkRepository.getSellerRepository(false));

    }

    getChangePasswordUseCase = (singleton = false): IChangePasswordUseCase => {

        if (this.changePasswordUseCase === null || this.changePasswordUseCase === undefined)

            this.changePasswordUseCase = new ChangePasswordUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.changePasswordUseCase;

        return new ChangePasswordUseCase(this.unitOfWorkRepository.getUserRepository(false));

    }

    getCheckUserEmailUseCase = (singleton = false): ICheckUserEmailUseCase => {

        if (this.checkUserEmailUseCase === null || this.checkUserEmailUseCase === undefined)

            this.checkUserEmailUseCase = new CheckUserEmailUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.checkUserEmailUseCase;

        return new CheckUserEmailUseCase(this.unitOfWorkRepository.getUserRepository(false));

    }

    getCreateAccountUseCase = (singleton = false): ICreateAccountUseCase => {

        if (this.createAccountUseCase === null || this.createAccountUseCase === undefined)

            this.createAccountUseCase = new CreateAccountUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.createAccountUseCase;

        return new CreateAccountUseCase(this.unitOfWorkRepository.getUserRepository(false));

    }

    getfavoriteProductsUseCase = (singleton = false): IGetFavoriteProductsUseCase => {

        if (this.getFavoriteProductsUseCase === null || this.getFavoriteProductsUseCase === undefined)

            this.getFavoriteProductsUseCase = new GetFavoriteProductsUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.getFavoriteProductsUseCase;

        return new GetFavoriteProductsUseCase(this.unitOfWorkRepository.getUserRepository(false));

    }

    getLoginUseCase = (singleton = false): ILoginUseCase => {

        if (this.loginUseCase === null || this.loginUseCase === undefined)

            this.loginUseCase = new LoginUseCase(this.unitOfWorkRepository.getUserRepository(false), this.unitOfWorkService.getTokenService(false))

        if (singleton)
            return this.loginUseCase;

        return new LoginUseCase(this.unitOfWorkRepository.getUserRepository(false), this.unitOfWorkService.getTokenService(false));

    }

    getRecoverPasswordUseCase = (singleton = false): IRecoverPasswordUseCase => {

        if (this.recoverPasswordUseCase === null || this.recoverPasswordUseCase === undefined)

            this.recoverPasswordUseCase = new RecoverPasswordUseCase(this.unitOfWorkRepository.getUserRepository(false))

        if (singleton)
            return this.recoverPasswordUseCase;

        return new RecoverPasswordUseCase(this.unitOfWorkRepository.getUserRepository(false));

    }

    getCenterDeliveryDaysUseCase = (singleton = false): IGetCenterDeliveryDaysUseCase => {

        if (this.centerDeliveryDaysUseCase === null || this.centerDeliveryDaysUseCase === undefined)

            this.centerDeliveryDaysUseCase = new GetCenterDeliveryDaysUseCase(this.unitOfWorkRepository.getRouteRepository(false))

        if (singleton)
            return this.centerDeliveryDaysUseCase;

        return new GetCenterDeliveryDaysUseCase(this.unitOfWorkRepository.getRouteRepository(false));

    }
    

}