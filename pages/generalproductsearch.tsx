import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _, { isNull, get } from 'lodash';
import { ICategory, ICenter, IPaginationData, IProduct, IServerResponse, ISeller } from 'src/domain/interfaces'
import { SearchProduct } from 'src/domain/models'
import { Grid, List, FormControl, InputLabel, Select, MenuItem, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from 'src/presentation/components/navigation/BottomNavigation';
import AppBar from 'src/presentation/components/appBar/AppBar';
import { Favorite, ShoppingCart, LocalOffer, AddShoppingCart } from '@material-ui/icons';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase';
import { ISearchProduct } from 'src//domain/interfaces';
import Product from 'src/presentation/components/product/Product';
import ProductCard from 'src/presentation/components/product/ProductCard';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import useCheckProductCart, { ICheckProductCallback, TypeMessageCheckProduct } from 'src/hooks/CheckProductCart';
import cartActions from 'src/redux/cart/actions';
import notify from 'src/redux/notifications/actions';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useTraductor } from 'src/hooks/Traductor';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';
import { useRouter } from 'next/router'
import useStore from 'src/redux/store';
import { createWrapper } from 'next-redux-wrapper';

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
        height: 'calc(100vh - 200px)',
        overflow: 'auto',
    },
    containerProducts: {},
});


const GeneralProductSearch = (props: any) => {

    //#region HOOKS

    const reduxErrorCallback = useReduxErrorCallback();
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const checkProductCart = useCheckProductCart();
    const traductor = useTraductor();
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


    //#endregion

    //#region USE_STATE

    const [cardView, setCardView] = useState(false);
    const [isViewingFavs, setIsViewingFavs] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [navOptionsToShow, setNavOptionsToShow] = useState(navOptions);
    const [pagination, setPagination] = useState({} as IPaginationData | undefined);
    const [nextPage, setNextPage] = useState(1);
    const [navValue, setNavValue] = useState(50);
    const [products, setProducts] = useState([] as IProduct[]);
    const [filterSelected, setFilterSelected] = useState('A-Z');
    const [categorySelected, setCategory] = useState('todas' as string);
    const [categories, setCategories] = useState([] as ICategory[]);

    //#endregion

    //#region USE_SELECTORS

    const centerSelected: ICenter | null = useSelector((state: any) => state.centers.selectedCenter);
    const suppliers: ISeller[] | null = useSelector((state: any) => state.providers);
    const centerInCart: ICenter | null = useSelector((state: any) => state.cart.center);
    const productsInCart: IProduct[] = useSelector((state: any) => state.cart.products);

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

        let aux: IProduct[] = _.cloneDeep(products);
        const index: number = products.findIndex((p: IProduct) => p.id === product.id);
        aux[index] = product;
        setProducts(aux);
    }

    const SearchFavorites = () => {

        if (centerSelected !== null) {

            const search: ISearchProduct = new SearchProduct();
            search.centerId = centerSelected.id;

            new UnitOfWorkUseCase().getProductsFromFavoriteListUseCase().getProductsFromFavoriteList(centerSelected.id).then((resp: IServerResponse<IProduct[]>) => {

                if (resp.ServerData?.Data && resp.ServerData?.Data.length > 0) {
                    setIsViewingFavs(true);
                    setNextPage(1);
                    products.length = 0;
                    setProducts(OrderProducts(resp.ServerData?.Data));

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

        if (centerSelected !== null) {

            const search: ISearchProduct = new SearchProduct();
            search.centerId = centerSelected.id;


            if (_category === 'todas')
                search.category = undefined
            else
                search.category = _category;
            if (_searchValue !== "")
                search.nameProduct = _searchValue;

            new UnitOfWorkUseCase().getSearchProductUseCase().searchProducts(search, page).then((response: IServerResponse<IProduct[]>) => {

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

                        setProducts(OrderProducts(response.ServerData?.Data || []));
                        setPagination(response.ServerData?.PaginationData);

                    } else {
                        let aux: IProduct[] = _.cloneDeep(products);
                        aux.push(...OrderProducts(response.ServerData?.Data || []));
                        setProducts(aux);
                        setPagination(response.ServerData?.PaginationData);
                    }
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
            });
        }

    }


    //#endregion

    //#region USE_EFFECTS

    useEffect(() => {

        useCheckTokenInvalid(() => {
            
            const service:UnitOfWorkService = new UnitOfWorkService();
            service.getTokenService().removeToken();
            service.getStateService().saveUserId(null);
            router.push("/");

        });

        if (centerSelected !== null) {

            /* if (props.location.state && props.location.state.searchValue) {
 
                 setSearchValue(props.location.state.searchValue);
                 SearchProducts(1, props.location.state.searchValue, 'todas');
                 let state = _.cloneDeep(props.location.state);
                 delete state.searchValue;
                 router.replace({ ...history.location, state });
             }
             else*/
            SearchProducts();

            new UnitOfWorkUseCase().getCategoriesByCentreUseCase().getCategoriesByCentre(centerSelected.id)
                .then((response: IServerResponse<ICategory[]>) => {
                    setCategories(response.ServerData?.Data || [])
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
        else
            router.push('/home');


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

        if (productsInCart.length === 0)
            dispatch(cartActions(reduxErrorCallback).cleanCart);

        AdminBottomNavIcon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart])

    useDeepCompareEffect(() => {

        const aux: IProduct[] = _.cloneDeep(products);
        let found: boolean = false;
        if (aux.length > 0) {

            productsInCart.forEach((p: IProduct) => {

                let product: IProduct | undefined = aux.find((pr: IProduct) => pr.id === p.id);
                if (product) {
                    found = true;
                    product.amount = p.amount;
                    product.amountsByDay = p.amountsByDay;
                }

            })
            if (found)
                setProducts(aux);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

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

            new UnitOfWorkUseCase().getAddProductToFavoriteListUseCase().addProductToFavoriteList(product.id).then(resp => {

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

            new UnitOfWorkUseCase().getDeleteProductFromFavoriteListUseCase().deleteProductFromFavoriteList(product.id).then(resp => {

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

            if (productsInCart.findIndex((p: IProduct) => p.id === product.id) === -1)

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
            else {
                UpdateProducts(product);
                dispatch(cartActions(reduxErrorCallback).saveProductToCart(product));
            }

        }
        else {

            dispatch(cartActions(reduxErrorCallback).deleteProductFromCart(product));
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

    const onSearchEnter = () => {

        SearchProducts();

    }

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
                title={traductor('lista_productos', { onlyfirst: true })}
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
            <Container className={classes.container} onScroll={handleScroll}>
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
                        : <List className={classes.containerProducts}>
                            {
                                products.map((product: IProduct, index: number) => {
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
        </>
    )
}

export default createWrapper(useStore).withRedux(GeneralProductSearch);
