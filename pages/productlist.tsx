import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _, { isNull, get } from 'lodash';
import { ICategory, ICenter, IPaginationData, IProduct, IServerResponse, ISeller } from 'src/domain/interfaces';
import { SearchProduct } from 'src/domain/models';
import { Grid, List, FormControl, InputLabel, Select, MenuItem, Container, CircularProgress, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from 'src/presentation/components/navigation/BottomNavigation';
import AppBar from 'src/presentation/components/appBar/AppBar';
import { Favorite, ShoppingCart, LocalOffer, AddShoppingCart } from '@material-ui/icons';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import { ICatalog, ISearchProduct } from 'src//domain/interfaces';
import Product from 'src/presentation/components/product/Product';
import ProductCard from 'src/presentation/components/product/ProductCard';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import useCheckProductCart, { ICheckProductCallback, TypeMessageCheckProduct } from 'src/hooks/CheckProductCart';
import cartActions from 'src/redux/cart/actions';
import notify from 'src/redux/notifications/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useTraductor } from 'src/hooks/Traductor';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';
import { useRouter } from 'next/router'
import { ITokenService } from 'src/infraestructure/interfaces';
import showNotification from "src/presentation/components/notifications";
import { ShowLoader, HideLoader } from "src/presentation/helpers/ShowGlobalLoader";


const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    formControl1: {
        flexGrow: 0.5,
        marginTop: '20px'
    },
    formControl2: {
        flexGrow: 0.45,
        marginTop: '20px'
    },
    button: {
        backgroundColor: '#2196F3',
        color: 'white',
    },
    container: {
        padding: 0,
        height: 'calc(100vh - 200px)',
        overflow: 'auto',
    },
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid 2196F3'
        }
    }
});


const ProductList = (props: any) => {

    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();
    const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();

    //#region HOOKS

    const reduxErrorCallback = useReduxErrorCallback();
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();
    const checkProductCart = useCheckProductCart();
    const router = useRouter();

    //#endregion


    const navOptions = [
        {
            label: traductor('favoritos', { onlyfirst: true }),
            icon: <Favorite />,
            enabled: true,
            id: 'fav'
        },
        {
            label: (traductor('productos_añadidos', { capitalize: true }) as string).replace('{0}', '0'),
            icon: <ShoppingCart />,
            enabled: true,
            id: 'cart_0'
        },
        {
            label: '',
            icon: <AddShoppingCart />,
            enabled: false,
            id: 'cart_+'
        },
        {
            label: traductor('ofertas', { onlyfirst: true }),
            icon: <LocalOffer />,
            enabled: true,
            id: 'offer'
        }
    ];

    const filter = [
        'A-Z',
        'Z-A',
        traductor('precio_alto', { onlyfirst: true }),
        traductor('precio_bajo', { onlyfirst: true })
    ];

    const updateProductsState = (_products: IProduct[]): IProduct[] => {


        const products: IProduct[] = _.cloneDeep(_products);

        if (products.length > 0) {

            productsInCart.forEach((p: IProduct) => {

                let product: IProduct | undefined = products.find((pr: IProduct) => pr.id === p.id);
                if (product) {
                    product.amount = p.amount;
                    product.amountsByDay = p.amountsByDay;
                }

            })

        }
        return products;
    };

    //#region USE_SELECTORS

    const catalogSelected: ICatalog | null = useSelector((state: any) => {

        if (props.isgeneralSearch)
            return null
        else
            return state.catalogs.selectedCatalog
    });
    const centerSelected: ICenter | null = useSelector((state: any) => state.centers.selectedCenter);
    const suppliers: ISeller[] | null = useSelector((state: any) => state.providers);
    const centerInCart: ICenter | null = useSelector((state: any) => state.cart.center);
    const productsInCart: IProduct[] = useSelector((state: any) => state.cart.products);

    //#endregion


    //#region USE_STATE

    const [cardView, setCardView] = useState(false);
    const [isViewingFavs, setIsViewingFavs] = useState(false);
    const [searchValue, setSearchValue] = useState(props.search);
    const [navOptionsToShow, setNavOptionsToShow] = useState(navOptions);
    const [pagination, setPagination] = useState(props.pagination as IPaginationData | null);
    const [nextPage, setNextPage] = useState(1);
    const [navValue, setNavValue] = useState(50);
    const [products, setProducts] = useState(updateProductsState(props.initProducts));
    const [filterSelected, setFilterSelected] = useState('A-Z');
    const [categorySelected, setCategory] = useState('todas' as string);
    const [categories, setCategories] = useState(props.initCategories);


    //#endregion

    //#region METHODS

    const OrderProducts = (products: IProduct[]): IProduct[] => {

        switch (filterSelected) {

            case 'A-Z':
                return _.orderBy(products, ['name'], ['asc'])


            case 'Z-A':
                return _.orderBy(products, ['name'], ['desc'])


            case traductor('precio_alto', { onlyfirst: true }):
                return _.orderBy(products, ['price'], ['desc'])


            case traductor('precio_bajo', { onlyfirst: true }):
                return _.orderBy(products, ['price'], ['asc'])

            default:
                return products;

        }
    }

    const AdminBottomNavIcon = () => {

        let navs: any[] = _.cloneDeep(navOptionsToShow);
        let totals: number[] | number = 0;

        if (productsInCart.length > 0) {

            totals = productsInCart.map((p: IProduct) => p.amount);
            totals = totals.reduce((prev, curr) => prev + curr);
        }
        let noCartProductsNavOption: any = navs.find(p => p.id === 'cart_0');
        let cartProductsNavOption: any = navs.find(p => p.id === 'cart_+');
        if (totals === 0) {

            noCartProductsNavOption.enabled = true;
            cartProductsNavOption.enabled = false;

        } else {

            if (totals === 1)
                cartProductsNavOption.label = (traductor('producto_añadido', { capitalize: true }) as string).replace('{0}', totals.toString())
            else
                cartProductsNavOption.label = (traductor('productos_añadidos', { capitalize: true }) as string).replace('{0}', totals.toString())

            noCartProductsNavOption.enabled = false;
            cartProductsNavOption.enabled = true;

        }
        setNavOptionsToShow(navs);

    }

    const favorites = (isViewingFavs: boolean) => {

        if (isViewingFavs)
            SearchFavorites();
        else {
            products.length = 0;
            SearchProducts();
            setNextPage(1);
            setNavValue(50);
        }
    }

    const UpdateProducts = (product: IProduct) => {

        const index: number = products.findIndex((p: IProduct) => p.id === product.id);
        products[index] = product;
        setProducts([...products]);
    }

    const SearchFavorites = () => {

        if (centerSelected !== null) {
            ShowLoader(dispatch);

            useCase.getProductsFromFavoriteListUseCase().getProductsFromFavoriteList(centerSelected.id).then((resp: IServerResponse<IProduct[]>) => {
                HideLoader(dispatch);
                if (resp.ServerData?.Data && resp.ServerData?.Data.length > 0) {
                    setIsViewingFavs(true);
                    setNextPage(1);
                    products.length = 0;
                    setProducts(OrderProducts(updateProductsState(resp.ServerData?.Data)));
                } else {
                    setIsViewingFavs(false);
                    setNavValue(50);
                    dispatch(
                        notify.showNotification({
                            type: 'confirm',
                            title: 'Info',
                            message: (traductor('no_productos_favoritos', { onlyfirst: true }) as string).replace("{0}", centerSelected.name),
                            onlyOk: true,
                            textOk: 'OK',
                        })
                    )
                }

            }).catch(error => {
                HideLoader(dispatch);
                setIsViewingFavs(false);
                setNavValue(50);
                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Info',
                        message: error.message,
                        onlyOk: true,
                        textOk: 'OK',
                    })
                )
            })
        }
    }


    const SearchProducts = (page: number = 1, _searchValue = searchValue, _category = categorySelected) => {

        ShowLoader(dispatch);
        const search: ISearchProduct = new SearchProduct();
        search.catalogId = catalogSelected && catalogSelected.id;
        search.centerId = centerSelected.id;

        if (_category === 'todas')
            search.category = undefined
        else
            search.category = _category;
        if (_searchValue !== "")
            search.nameProduct = _searchValue;

        useCase.getSearchProductUseCase().searchProducts(search, page).then((response: IServerResponse<IProduct[]>) => {

            if (response.ServerData?.Data.length === 0) {
                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Info',
                        message: traductor('no_producto_encontrado', { onlyfirst: true }),
                        onlyOk: true,
                        textOk: 'OK',
                    })
                )
                setProducts([]);
                setPagination(undefined);
            }
            else {

                if (page === 1) {

                    setProducts(OrderProducts(updateProductsState(response.ServerData?.Data || [])));
                    setPagination(response.ServerData?.PaginationData);

                } else {
                    products.push(...OrderProducts(updateProductsState(response.ServerData?.Data) || []));
                    setProducts([...products]);
                    setPagination(response.ServerData?.PaginationData);
                }
            }
            HideLoader(dispatch);

        }).catch(error => {
            HideLoader(dispatch);
            dispatch(
                notify.showNotification({
                    type: 'confirm',
                    title: 'Error',
                    message: error.message,
                    onlyOk: true,
                    textOk: 'OK',
                })
            )
        });

    }

    //#endregion

    //#region USE_EFFECTS

    useEffect(() => {

        useCheckTokenInvalid(() => {

            tokenService.removeToken();
            router.push("/");

        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        if (isViewingFavs) {
            setNavValue(50);
            setIsViewingFavs(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySelected])

    useEffect(() => {

        setProducts(OrderProducts(products));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterSelected])

    useDeepCompareEffect(() => {

        AdminBottomNavIcon()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart])


    //#endregion

    //#region CALLBACKS

    const onHandleNavChangeOption = (_: any, selected: any) => {

        setNavValue(selected)
        switch (selected) {

            case 0:
                setIsViewingFavs(isViewingFavs => {
                    favorites(!isViewingFavs);
                    return !isViewingFavs;
                })
                break;

            case 1:
                setIsViewingFavs(false);

                if (productsInCart.length === 0) {

                    dispatch(
                        notify.showNotification({
                            type: 'confirm',
                            title: 'Info',
                            message: traductor('no_productos_en_carrito', { onlyfirst: true }),
                            onlyOk: true,
                            textOk: 'OK',
                        })
                    )
                } else {

                    router.push('/checkout');
                }
                break;
        }
    }

    const onMessageInfo = (message: ICheckProductCallback) => {

        switch (message.typeMessage) {

            case TypeMessageCheckProduct.DIFFERENT_CENTERS:

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: traductor('cambiar_centro', { onlyfirst: true }),
                        message: message.message,
                        onClose: () => { },
                        onOk: () => {
                            dispatch(cartActions(reduxErrorCallback).saveCenterToCart(centerSelected));
                        },
                        textClose: traductor('no_cambiar_centro', { onlyfirst: true }),
                        textOk: traductor('cambiar_centro', { onlyfirst: true })
                    })
                )

                break;

            case TypeMessageCheckProduct.PRODUCT_NOT_BELONG_TO_CURRENT_CENTER:

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: traductor('añadir_producto', { onlyfirst: true }),
                        message: message.message,
                        onClose: () => { },
                        onOk: () => {
                            dispatch(cartActions(reduxErrorCallback).cleanCart);
                            dispatch(cartActions(reduxErrorCallback).saveCenterToCart(centerSelected));
                            dispatch(cartActions(reduxErrorCallback).saveSupplierToCart(suppliers?.find((s: ISeller) => s.id === message.product.sellerId) || null));
                            dispatch(cartActions(reduxErrorCallback).saveProductToCart(message.product));
                            UpdateProducts(message.product);
                        },
                        textClose: traductor('no_añadir_producto', { onlyfirst: true }),
                        textOk: traductor('añadir_producto', { onlyfirst: true })
                    })
                )
                break;

            case TypeMessageCheckProduct.PRODUCT_NOT_BELONG_TO_CURRENT_SUPPLIER:

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: traductor('añadir_producto', { onlyfirst: true }),
                        message: message.message,
                        onClose: () => { },
                        onOk: () => {
                            dispatch(cartActions(reduxErrorCallback).deleteProductsFromCart);
                            dispatch(cartActions(reduxErrorCallback).saveSupplierToCart(suppliers?.find((s: ISeller) => s.id === message.product.sellerId) || null));
                            dispatch(cartActions(reduxErrorCallback).saveProductToCart(message.product));
                            UpdateProducts(message.product);
                        },
                        textClose: traductor('no_añadir_producto', { onlyfirst: true }),
                        textOk: traductor('añadir_producto', { onlyfirst: true })
                    })
                )

                break;

            case TypeMessageCheckProduct.SHOW_MESSAGE:

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Mensaje',
                        message: message.message,
                        onlyOk: true,
                        textOk: 'OK',
                    })
                )
                break;
        }

    }

    const onProductFavoriteClicked = (product: IProduct) => {

        if (product.favorite)

            useCase.getAddProductToFavoriteListUseCase().addProductToFavoriteList(product.id).then(resp => {

                UpdateProducts(product);

            }).catch(error => {

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Error',
                        message: error.message,
                        onlyOk: true,
                        textOk: 'OK',
                    })
                )
            })
        else

            useCase.getDeleteProductFromFavoriteListUseCase().deleteProductFromFavoriteList(product.id).then(resp => {

                if (isViewingFavs) {

                    let aux: IProduct[] = _.cloneDeep(products);
                    aux.splice(aux.findIndex((p: IProduct) => p.id === product.id), 1);
                    setProducts(aux);
                    if (aux.length === 0) {
                        products.length = 0;
                        setNextPage(1);
                        setIsViewingFavs(false);
                        setNavValue(50);
                        SearchProducts();
                    }
                } else {
                    UpdateProducts(product);
                }

            }).catch(error => {

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Error',
                        message: error.message,
                        onlyOk: true,
                        textOk: 'OK',
                    })
                )
            })
    }

    const onProductAmountModified = (product: IProduct) => {

        if (product.amount > 0) {

            if (productsInCart.findIndex((p: IProduct) => p.id === product.id) === -1) {

                checkProductCart(product, onMessageInfo).then((resp: boolean | void) => {

                    if (resp) {
                        dispatch(cartActions(reduxErrorCallback).saveProductToCart(product));
                        if (!isNull(centerInCart))
                            dispatch(cartActions(reduxErrorCallback).saveCenterToCart(centerInCart));

                        else
                            dispatch(cartActions(reduxErrorCallback).saveCenterToCart(centerSelected));

                        dispatch(cartActions(reduxErrorCallback).saveSupplierToCart(suppliers?.find((s: ISeller) => s.id === product.sellerId) || null));
                        UpdateProducts(product);
                    }

                }).catch(error => {

                    dispatch(
                        notify.showNotification({
                            type: 'confirm',
                            title: 'Error',
                            message: error.message,
                            onlyOk: true,
                            textOk: 'OK',
                        })
                    )
                })
            }
            else {
                UpdateProducts(product);
                dispatch(cartActions(reduxErrorCallback).saveProductToCart(product));

            }

        }
        else {
            dispatch(cartActions(reduxErrorCallback).deleteProductFromCart(product)).then(() => {

                if (productsInCart.length - 1 === 0)
                    dispatch(cartActions(reduxErrorCallback).cleanCart);
            });
            UpdateProducts(product);
        }

    }

    const handleScroll = (e: any) => {

        const el = e.target;
        if (el.scrollHeight - el.scrollTop === el.clientHeight)

            if (!isViewingFavs && pagination && nextPage < pagination?.totalPages) {
                setNextPage(nextPage + 1)
                SearchProducts(nextPage + 1);
            }

    }

    const onCategorySelected = (e: any) => {

        setNextPage(1);
        setProducts([]);
        setCategory(e.target.value);
        SearchProducts(1, searchValue, e.target.value);

    }

    const onFilterSelected = (e: any) => {
        setFilterSelected(e.target.value);
    }


    const onSearchEnter = () => SearchProducts();

    //#endregion


    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                handleSearch={(e: any) => {
                    setSearchValue(get(e, 'target.value', ''))
                    if (e.target.value === '')
                        SearchProducts(1, '');
                }}
                searchValue={searchValue}
                backIcon
                handleEnter={onSearchEnter}
                title={traductor('productos', { onlyfirst: true })}
                cardView={cardView}
                setCardView={(e: any, switchState: any) => setCardView(switchState)}
                searchEnabled={!isViewingFavs && true}
            />
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{ marginTop: '65px', marginBottom: '10px', padding: '0 10px' }}
            >
                <FormControl className={classes.formControl1}>
                    <InputLabel id="category-simple-select-label">{traductor('categorias', { onlyfirst: true })}</InputLabel>
                    <Select
                        labelId="category-simple-select-label"
                        id="category-simple-select"
                        value={categorySelected}
                        onChange={onCategorySelected}
                    >
                        <MenuItem key={'todas'} value={'todas'}>-- {traductor('todas_categorias', { onlyfirst: true })} --</MenuItem>
                        {
                            categories.map((category: ICategory, index: number) => {

                                if (category.categoryName === categorySelected)
                                    return (
                                        <MenuItem key={index} selected value={category.categoryName}>
                                            {category.categoryName}
                                        </MenuItem>
                                    )

                                else
                                    return (
                                        <MenuItem key={index} value={category.categoryName}>
                                            {category.categoryName}
                                        </MenuItem>
                                    )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl2}>
                    <InputLabel id="filter-simple-select-label">{traductor('filtro', { onlyfirst: true })}</InputLabel>
                    <Select
                        labelId="filter-simple-select-label"
                        id="filter-simple-select"
                        value={filterSelected}
                        onChange={onFilterSelected}
                    >
                        {
                            filter.map((_filter: string, index: number) => {
                                return <MenuItem key={index} value={_filter}>{_filter}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Container maxWidth={false} className={`${classes.container} ${classes.scrollBar}`} onScroll={(e: any) => handleScroll(e)}>
                {
                    cardView
                        ? <Grid container wrap={'wrap'} style={{ marginBottom: '60px' }}>
                            {products.map((product: IProduct, index: number) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <ProductCard
                                            key={index}
                                            onProductAmountModified={onProductAmountModified}
                                            onProductFavoriteClicked={onProductFavoriteClicked}
                                            product={product}
                                        />
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                        : <List>
                            {
                                products && products.map((product: IProduct, index: number) => {
                                    return (
                                        <Product
                                            key={index}
                                            onProductAmountModified={onProductAmountModified}
                                            onProductFavoriteClicked={onProductFavoriteClicked}
                                            product={product}
                                        />
                                    )
                                })
                            }
                        </List>
                }
            </Container>
            <BottomNavigation
                position="fixed"
                handleNavChange={onHandleNavChangeOption}
                navValue={navValue}
                navOptions={navOptionsToShow.filter(n => n.enabled === true)}
            />
            {showNotification()}

        </>
    )
}


export async function getServerSideProps(ctx: any) {


    try {

        const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();
        let products: IServerResponse<IProduct[]>;
        let categories: IServerResponse<ICategory[]>;
        const search: ISearchProduct = new SearchProduct();
        const { req, query } = ctx;
        let isgeneralSearch: boolean = false;

        if (query && query.isGeneralSearch && query.isGeneralSearch === 'true')
            isgeneralSearch = true;
        else
            isgeneralSearch = false;

        if (!isgeneralSearch && (query.centerId === undefined || query.catalogId === undefined))
            throw new Error("Ha de seleccionar un centro y un catálogo")

        if (isgeneralSearch && query.centerId === undefined)
            throw new Error("Ha de seleccionar un centro")

        if (!isgeneralSearch)
            search.catalogId = query.catalogId;

        search.centerId = query.centerId;
        search.nameProduct = query.search;
        products = await useCase.getSearchProductUseCase().searchProducts(search, 1, req.cookies["session"]);
        if (isgeneralSearch)
            categories = await useCase.getCategoriesByCentreUseCase().getCategoriesByCentre(search.centerId, req.cookies["session"]);
        else
            categories = await useCase.getCategoriesUseCase().getCategories(search.catalogId, search.centerId, req.cookies["session"]);

        return {
            props: { isgeneralSearch, pagination: products.ServerData?.PaginationData, search: query.search || null, initProducts: _.orderBy(products.ServerData?.Data, ['name'], ['asc']), initCategories: categories.ServerData?.Data }
        };
    }
    catch (error) {
        return {
            redirect: {
                destination: '/error?error=' + error.message,
                permanent: false,
            },
        }
    }

}

export default ProductList;




