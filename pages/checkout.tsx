import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import _, { get } from 'lodash';
import {
    List,
    Button,
    Grid,
    Typography,
    TextField,
    Container,
    useMediaQuery,
    InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ShoppingCart,
    List as ListIcon,
    Event,
} from '@material-ui/icons';
import { ICenter, IProduct, IServerResponse, ISeller, IOrder, IOrderCenterInfo, IOrderSellerInfo, ISearchProduct } from 'src/domain/interfaces'
import { Order, OrderCenterInfo, OrderSellerInfo, SearchProduct } from 'src/domain/models'
import AppBar from 'src/presentation/components/appBar/AppBar';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase';
import Product from 'src/presentation/components/product/Product';
import ProductCard from 'src/presentation/components/product/ProductCard';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import cartActions from 'src/redux/cart/actions';
import notify from 'src/redux/notifications/actions';
import { Currency } from 'src/domain/enums';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import TopNavigation from 'src/presentation/components/navigation/TopNavigation';
import { useTraductor } from 'src/hooks/Traductor';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';
import { useRouter } from 'next/router'
import useStore from 'src/redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { IState } from 'src/infraestructure/interfaces';
import useSetState from 'src/hooks/SetState';
const { encode } = require('url-encode-decode');
import GetState from 'src/presentation/helpers/GetState';


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
    container: {
        height: 'calc(100vh - 155px)',
        overflow: 'auto',
    },
    containerProducts: {
        marginTop: 20,
    },
    checkoutButton: {
        backgroundColor: '#2196F3',
        color: 'white',
        display: 'block',
        margin: '30px auto 20px'
    },
    resumen: {
        marginBottom: 14,
        color: '#2196F3'
    }
});

const CheckOut = (props: any) => {

    const service: UnitOfWorkService = new UnitOfWorkService();
    const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase();

    //#region HOOKS

    const reduxErrorCallback = useReduxErrorCallback();
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const setState = useSetState();


    //#endregion

    //#region USE_STATE

    const supplier: ISeller = props.cart.supplier;
    const center: ICenter = props.cart.center;
    const productsCart: IProduct[] = props.cart.products;
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([] as IProduct[]);
    const [order, setOrder] = useState({} as IOrder);
    const [calendarDays, setCalendarDays] = useState([] as Date[]);
    const [navValue, setNavValue] = useState(0);
    const traductor = useTraductor();
    const checkoutNavOptions = [
        {
            label: traductor('desglose', { onlyfirst: true }),
            icon: <ListIcon />,
        },
        {
            label: traductor('comprar_mas', { capitalize: true }),
            icon: <ShoppingCart />,
        },
        {
            label: traductor('fecha_entrega', { capitalize: true }),
            icon: <Event />,
        },
    ];


    //#endregion


    //#region METHODS


    const UpdateProducts = (product: IProduct) => {

        const index: number = products.findIndex((p: IProduct) => p.id === product.id);
        products[index] = product;
        setProducts([...products]);
    }

    const DeleteProduct = (product: IProduct) => {

        let aux: IProduct[] = _.cloneDeep(products);
        const index: number = products.findIndex((p: IProduct) => p.id === product.id);
        aux.splice(index, 1);
        if (aux.length === 0) {
            dispatch(cartActions(reduxErrorCallback).cleanCart).then(() => { setState(useStore().getState()) });
            router.back();
        }
        else
            setProducts(aux);
    }

    const GenerateOrder = () => {

        const userId: string | undefined = new UnitOfWorkService().getTokenService().getClaimFromToken('userId');

        if (!userId) {
            new UnitOfWorkService().getTokenService().removeToken();
        } else {
            const _center: IOrderCenterInfo = new OrderCenterInfo();
            _center.centerId = center.id;
            _center.buyerId = center.buyerId;
            _center.centerName = center.name;
            _center.imageUrl = center.imageUrl;

            const _seller: IOrderSellerInfo = new OrderSellerInfo();
            _seller.sellerId = supplier.id;
            _seller.sellerName = supplier.companyName;

            order.createdAt = new Date(moment(Date.now()).format("YYYY/MM/DD"));
            order.currency = Currency.EUR;
            order.center = _center;
            order.seller = _seller;
            order.userId = userId;
            order.primaryCode = '';
            setOrder(order);
        }
    }

    //#endregion

    //#region USE_EFFECTS

    useEffect(() => {

        useCheckTokenInvalid(() => {

            service.getTokenService().removeToken();
            router.push("/");

        });

        GenerateOrder();
        if (supplier !== null && center !== null && productsCart.length > 0)

            useCase.getProductsFromFavoriteListUseCase().getProductsFromFavoriteList(center.id).then((resp: IServerResponse<IProduct[]>) => {

                if (resp.ServerData?.Data && resp.ServerData?.Data.length > 0) {

                    const favorites: IProduct[] = resp.ServerData?.Data;
                    const aux: IProduct[] = _.cloneDeep(productsCart).map((p: IProduct) => {

                        p.favorite = false;
                        return p;

                    });

                    favorites.forEach((p: IProduct) => {

                        const found: IProduct | undefined = aux.find((_p: IProduct) => {

                            return _p.id === p.id
                        });

                        if (found)
                            found.favorite = true;

                    });
                    setProducts(aux);
                } else {
                    setProducts(_.cloneDeep(productsCart).map((p: IProduct) => {

                        p.favorite = false;
                        return p;

                    }));
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

        else
            router.push('/home');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {

        if (products.length > 0) {

            const _order: IOrder = _.cloneDeep(order);
            _order.products = _.cloneDeep(products);
            useCase.getOrderTotalSummaryUseCase().getOrderTotalsSummary(_order).then(resp => {

                setOrder((resp.ServerData?.Data as IOrder) || new Order());

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    useEffect(() => {

        if (calendarDays.length > 0)
            dispatch(
                notify.showNotification({
                    type: 'datepicker',
                    availableDates: calendarDays,
                    onMonthChanged: onMonthChanged,
                    selectedDate: onDeliveryDateCalendarDayClick
                })
            )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDays])

    //#endregion

    //#region CALLBACKS

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
        else {

            useCase.getDeleteProductFromFavoriteListUseCase().deleteProductFromFavoriteList(product.id).then(resp => {

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
        }

    }

    const onProductAmountModified = (product: IProduct) => {

        if (product.amount > 0) {

            dispatch(cartActions(reduxErrorCallback).saveProductToCart(product)).then(() => setState(useStore().getState()));
            UpdateProducts(product);
        }
        else {

            dispatch(cartActions(reduxErrorCallback).deleteProductFromCart(product)).then(() => setState(useStore().getState()));
            DeleteProduct(product);
        }
    }

    const onEndOrderClick = () => {

        dispatch(
            notify.showNotification({

                type: 'confirm',
                title: 'Info',
                message: 'Enviar pedido',
                textOk: 'SI',
                textClose: 'NO',
                onOk: () => {

                    useCase.getConfirmOrderUseCase().confirmOrder(order).then(resp => {
                        dispatch(cartActions(reduxErrorCallback).cleanCart).then(() => { setState(useStore().getState()) });
                        router.push('/confirmation')

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
            })
        )
    }

    const onBuyMoreClick = () => {

        router.push('/productlist');
    }

    const onClearCartClick = () => {

        dispatch(
            notify.showNotification({
                type: 'confirm',
                title: 'Info',
                message: traductor('limpiar_carrito_mensaje', { onlyfirst: true }),
                textOk: 'OK',
                textClose: traductor('cancelar', { onlyfirst: true }),
                onOk: () => {
                    dispatch(cartActions(reduxErrorCallback).cleanCart).then(() => { setState(useStore().getState()) });
                    router.back();
                }
            })
        )


    }

    const onBreakdownClick = () => {

        router.push({

            pathname: '/breakdown',
            query: {
                order: encode(JSON.stringify({
                    totalProducts: order.totalProducts,
                    totalBase: order.totalBase,
                    totalTaxes: order.totalTaxes,
                    total: order.total
                }))
            },

        });
    }

    const getPathDays = (month: number, year: number) => {

        useCase.getCenterDeliveryDaysUseCase().getCenterDeliveryDays(center.id, month, year).then((resp: IServerResponse<Date[]>) => {

            if (resp.ServerData?.Data && resp.ServerData.Data.length > 0)
                setCalendarDays(resp.ServerData.Data);


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

    const onDeliveryDateClick = () => getPathDays(moment().month() + 1, moment().year())

    const onMonthChanged = (month: number, year: number) => getPathDays(month + 1, year);

    const onDeliveryDateCalendarDayClick = (date: number) => {

        order.deliveryDate = new Date(new Date(date).setHours(0, 0, 0, 0));
        setOrder(order);
    }

    const onHandleNavChangeOption = (_: any, selected: any) => {

        setNavValue(selected)
        switch (selected) {
            case 0:
                onBreakdownClick()
                break;
            case 1:
                onBuyMoreClick()
                break;
            case 2:
                onDeliveryDateClick()
                break;
        }
    }

    //#endregion

    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                handleSearch={(e: any) => setSearchValue(get(e, 'target.value', ''))}
                searchValue={searchValue}
                backIcon
                title={traductor('finalizar_pedido', { onlyfirst: true })}
                showSwitch={false}
            />
            <TopNavigation
                handleNavChange={onHandleNavChangeOption}
                navValue={navValue}
                navOptions={checkoutNavOptions}
            />
            <Container className={classes.container}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.resumen}
                    >
                        {traductor('resumen_pedido', { onlyfirst: true })}
                    </Typography>
                    <TextField
                        id="proveedor"
                        size={'small'}
                        margin={'dense'}
                        disabled={true}
                        label={<span style={{ color: 'black' }}>{traductor('proveedor', { onlyfirst: true })}</span>}
                        fullWidth
                        defaultValue={`${get(supplier, 'companyName', 'N/A')}`}
                        inputProps={{ style: { color: 'black' } }}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                    />
                    <TextField
                        id="centro"
                        size={'small'}
                        margin={'dense'}
                        disabled={true}
                        label={<span style={{ color: 'black' }}>{traductor('centro', { onlyfirst: true })}</span>}
                        fullWidth
                        defaultValue={`${get(center, 'name', 'N/A')}`}
                        inputProps={{ style: { color: 'black' } }}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                    />
                    <TextField
                        id="quantity"
                        size={'small'}
                        margin={'dense'}
                        disabled={true}
                        label={<span style={{ color: 'black' }}>{traductor('cantidad_productos', { onlyfirst: true })}</span>}
                        fullWidth
                        value={`${get(order, 'totalProducts', '0')}`}
                        inputProps={{ style: { color: 'black' } }}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                    />
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={6}>
                            <TextField
                                id="base"
                                size={'small'}
                                label={<span style={{ color: 'black' }}>{traductor('base', { onlyfirst: true })}</span>}
                                disabled={true}
                                margin={'dense'}
                                fullWidth
                                value={`${get(order, 'totalBase', '0')}`}
                                inputProps={{ style: { color: 'black' } }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>
                                }}
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="taxes"
                                size={'small'}
                                label={<span style={{ color: 'black' }}>{traductor('total_impuestos', { onlyfirst: true })}</span>}
                                disabled={true}
                                margin={'dense'}
                                fullWidth
                                value={`${get(order, 'totalTaxes', '0')}`}
                                inputProps={{ style: { color: 'black' } }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>
                                }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        id="total"
                        size={'small'}
                        label={<span style={{ color: 'black' }}>{traductor('total', { uppercase: true })}</span>}
                        disabled={true}
                        margin={'dense'}
                        fullWidth
                        value={`${get(order, 'total', '0')}`}
                        inputProps={{ style: { color: 'black' } }}
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end">€</InputAdornment>
                        }}
                        variant="outlined"
                    />
                    <Button color={'primary'} onClick={onClearCartClick}>{traductor('limpiar_carrito', { onlyfirst: true })}</Button>
                </Grid>

                {

                    isDesktop
                        ? <Grid container wrap={'wrap'}>
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

                <Button
                    className={classes.checkoutButton}
                    variant="contained"
                    disableElevation
                    onClick={onEndOrderClick}
                >
                    {traductor('finalizar_pedido', { uppercase: true })}
                </Button>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx:any) {

    try {

        let state: IState;

        state = await GetState(ctx.req);

        return {
            props: { cart: state.cart }
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

export default createWrapper(useStore).withRedux(CheckOut);
