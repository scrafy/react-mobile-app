import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStore from 'src/redux/store';
import { get } from 'lodash';
import { ICenter } from 'src/domain/interfaces/ICenter';
import centerActions from 'src/redux/centres/actions';
import getProviders from 'src/redux/providers/actions';
import catalogActions from 'src/redux/catalogs/actions';
import { ICatalog, IProduct } from 'src/domain/interfaces';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import { Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from 'src/presentation/components/navigation/BottomNavigation';
import AppBar from 'src/presentation/components/appBar/AppBar';
import Drawer from 'src/presentation/components/drawer/TemporaryDrawer';
import CartTooltip from 'src/presentation/components/tooltip/CartTooltip';
import SimpleSelect from 'src/presentation/components/dropdowns/SimpleSelect';
import { ILocalStorageService, ITokenService } from 'src/infraestructure/interfaces';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import notify from 'src/redux/notifications/actions';
import cartActions from 'src/redux/cart/actions';
import userActions from 'src/redux/users/actions';
import { useRouter } from 'next/router'
import {
    AddCircle,
    LocalShipping,
    Store,
    History
} from '@material-ui/icons';
import ErrorIcon from '@material-ui/icons/Error';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import _ from 'lodash';
import { useTraductor } from 'src/hooks/Traductor';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';
import { createWrapper } from 'next-redux-wrapper';

const useStyles = makeStyles({
    button: {
        backgroundColor: '#2196F3',
        color: 'white',
    },
    container: {
        marginTop: '100px',
    },
    tooltip: {
        position: 'absolute',
        bottom: '72px',
        right: '22px',
        backgroundColor: 'orange'
    }
});

const Home = ({ initialState }) => {

    const traductor = useTraductor();
    const SideBarOptions = (perInfoCallback: Function, openIncidenceCallback: Function) => [

        {
            text: traductor("informacion_personal", { capitalize: true }),
            icon: <PermIdentityIcon />,
            action: (e: any) => perInfoCallback(),
        },
        {
            text: traductor("abrir_incidencia", { capitalize: true }),
            icon: <ErrorIcon />,
            action: (e: any) => openIncidenceCallback(),
        }
    ];
    const navOptions = [

        {
            label: traductor("proveedores", { onlyfirst: true }),
            icon: <LocalShipping />,
        },
        {
            label: traductor("centros", { onlyfirst: true }),
            icon: <Store />,
        },
        {
            label: traductor("historial", { onlyfirst: true }),
            icon: <History />,
        }
    ];

    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const reduxErrorCallback = useReduxErrorCallback();
    const centers: ICenter[] = useSelector((state: any) => state.centers.centers);
    const centerCatalogs: ICatalog[] = useSelector((state: any) => state.catalogs.catalogs);
    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);
    const centerInCart: ICenter = useSelector((state: any) => state.cart.center);
    const [searchValue, setSearchValue] = useState('');
    const [navValue, setNavValue] = useState(50);
    const [drawer, setDrawer] = useState(false);
    const [centerSelected, setCenterSelected] = useState({} as ICenter | null);
    const [catalogSelected, setCatalogSelected] = useState({} as ICatalog | null);

    //  useCheckTokenInvalid();

    useEffect(() => {

        
        const localStorageService: ILocalStorageService = new UnitOfWorkService().getLocalStorageService();
        const tokenService: ITokenService = new UnitOfWorkService().getTokenService();
        const userId: string | undefined = tokenService.getClaimFromToken("userId");

        if (!userId)
            router.push('/index');

        if (localStorageService.loadState() && localStorageService.loadState().userId && localStorageService.loadState().userId !== userId) {

            dispatch(cartActions(reduxErrorCallback).cleanCart);
            dispatch(centerActions(reduxErrorCallback).saveCenter(null));
            dispatch(catalogActions(reduxErrorCallback).saveCatalog(null));

        } else {

            const centerSelected: ICenter | null = localStorageService.loadState() && localStorageService.loadState().centers.selectedCenter;
            const catalogSelected: ICatalog | null = localStorageService.loadState() && localStorageService.loadState().catalogs.selectedCatalog;
            if (centerSelected !== null) {
                setCenterSelected(centerSelected);
                dispatch(centerActions(reduxErrorCallback).saveCenter(centerSelected));
                dispatch(catalogActions(reduxErrorCallback).getCenterCatalogs(centerSelected.id));
            }

            if (catalogSelected !== null) {
                setCatalogSelected(catalogSelected);
                dispatch(catalogActions(reduxErrorCallback).saveCatalog(catalogSelected));
            }
        }
        dispatch(userActions(reduxErrorCallback).saveUserId(new UnitOfWorkService().getTokenService().getClaimFromToken("userId")));
        dispatch(centerActions(reduxErrorCallback).getCenters);
        dispatch(getProviders(reduxErrorCallback).getProviders);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {

        if (centerInCart)
            if (centers.length > 0)

                if (!_.some(centers, ((c: ICenter) => c.id === centerInCart.id)))
                    dispatch(cartActions(reduxErrorCallback).cleanCart);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [centers])

    const onCenterSelected = (event: any) => {

        setCatalogSelected(null);
        dispatch(catalogActions(reduxErrorCallback).saveCatalog(null));
        if (parseInt(event.target.value) > 0 && parseInt(event.target.value) < 1000) {

            const selectedCenter: ICenter | undefined = centers.find((center: ICenter) => center.id === parseInt(event.target.value));
            if (selectedCenter) {

                dispatch(centerActions(reduxErrorCallback).saveCenter(selectedCenter));
                setCenterSelected(selectedCenter);
            }

            dispatch(catalogActions(reduxErrorCallback).getCenterCatalogs(parseInt(event.target.value)));
        }
        else {
            dispatch(centerActions(reduxErrorCallback).saveCenter(null));
            dispatch(catalogActions(reduxErrorCallback).getCenterCatalogs(null));
            setCenterSelected(null);
            setCatalogSelected(null);
        }

    }

    const onCatalogSelected = (event: any) => {

        if (parseInt(event.target.value) > 0 && parseInt(event.target.value) < 1000) {
            const selectedCatalog: ICatalog | undefined = centerCatalogs.find((catalog: ICatalog) => catalog.id === parseInt(event.target.value));
            if (selectedCatalog) {
                dispatch(catalogActions(reduxErrorCallback).saveCatalog(selectedCatalog));
                setCatalogSelected(selectedCatalog);
            }
        }
        else {
            dispatch(catalogActions(reduxErrorCallback).saveCatalog(null));
            setCatalogSelected(null);
        }

    }

    const createOrder = (event: any) => {

        if (catalogSelected === null)
            return;

        router.push(`/productlist?center=${centerSelected?.id}&catalog=${catalogSelected.id}`);
    }

    const onHandleNavChangeOption = (_: any, selected: any) => {

        setNavValue(selected)

        switch (selected) {

            case 0:
                router.push('/suppliers');
                break;

            case 1:
                router.push('/centers');
                break;

            case 2:
                router.push('/historyorders');
                break;
        }

    }

    const handleEnter = () => {

        if (searchValue !== '')

            router.push('/generalproductsearch');
        else
            dispatch(
                notify.showNotification({
                    type: 'confirm',
                    title: 'Info',
                    message: traductor('busqueda_producto', { onlyfirst: true }),
                    onlyOk: true,
                    textOk: 'OK',
                })
            )

    }

    const onOpenPersonalInfoCallback = () => {
        dispatch(
            notify.showNotification({
                type: 'personal'
            })
        )
    }

    const onOpenErrorFormCallback = () => router.push("/incidence");

    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => setDrawer(true)}
                handleSearch={(e: any) => setSearchValue(e.target.value)}
                handleEnter={handleEnter}
                searchValue={searchValue}
                title='PedidoOne'
                searchEnabled={centerSelected !== null}
                showSwitch={false}
            />
            <Drawer open={drawer} setOpen={setDrawer} options={SideBarOptions(onOpenPersonalInfoCallback, onOpenErrorFormCallback)} />
            <Container className={classes.container}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <SimpleSelect
                        id={'centers'}
                        label={traductor("centros", { onlyfirst: true })}
                        handleChange={onCenterSelected}
                        value={get(centerSelected, 'id', '0')}
                        selectoptions={
                            [
                                {
                                    key: '0',
                                    value: '0',
                                    label: `-- ${traductor("selector_centro", { onlyfirst: true })} --`
                                },
                                ...centers.map(center => {
                                    return ({
                                        key: get(center, 'id', ''),
                                        value: get(center, 'id', ''),
                                        label: get(center, 'name', 'N/A')
                                    })
                                })
                            ]
                        }
                    />
                    <SimpleSelect
                        id={'catalogs'}
                        label={traductor("catalogos", { onlyfirst: true })}
                        handleChange={onCatalogSelected}
                        value={get(catalogSelected, 'id', '0')}
                        selectoptions={
                            [
                                {
                                    key: '0',
                                    value: '0',
                                    label: `-- ${traductor("selector_catalogo", { onlyfirst: true })} --`
                                },
                                ...centerCatalogs.map(catalog => {
                                    return ({
                                        key: get(catalog, 'id', ''),
                                        value: get(catalog, 'id', ''),
                                        label: get(catalog, 'name', 'N/A')
                                    })
                                })
                            ]
                        }
                    />
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<AddCircle />}
                        disabled={!(centerSelected !== null && catalogSelected !== null)}
                        onClick={createOrder}
                    >
                        {traductor("realizar_pedido", { uppercase: true })}
                    </Button>
                </Grid>
            </Container>
            <BottomNavigation
                handleNavChange={onHandleNavChangeOption}
                navValue={navValue}
                navOptions={navOptions}
            />
            {cartProducts.length && <CartTooltip color='orange' />}
        </>
    )
}


/*Home.getServerSideProps = async (ctx: any) => {

    const initialState: any = new UnitOfWorkService().getLocalStorageService().loadState() || {};
    return { props: { initialState } };

}*/

Home.getInitialProps = async (ctx: any) => {

    const initialState: any = new UnitOfWorkService().getLocalStorageService().loadState() || {};
    return { initialState };

}


export default createWrapper(useStore).withRedux(Home);
