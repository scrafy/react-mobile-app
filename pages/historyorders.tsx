import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import notify from 'src/redux/notifications/actions';
import cartActions from 'src/redux/cart/actions';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/';
import AppBar from 'src/presentation/components/appBar/AppBar';
import OrderList from 'src/presentation/components/orders/OrderList';
import OrderCards from 'src/presentation/components/orders/OrderCards';
import CartTooltip from 'src/presentation/components/tooltip/CartTooltip';
import TopNavigation from 'src/presentation/components/navigation/TopNavigation';
import { ICenter, IOrder, IProduct, ISeller, IServerResponse } from 'src/domain/interfaces';
import { useTraductor } from 'src/hooks/Traductor';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';
import { createWrapper } from 'next-redux-wrapper';
import { useRouter } from 'next/router'
import useStore from 'src/redux/store';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';

function HistoryOrders() {

    const reduxErrorCallback = useReduxErrorCallback();
    const router = useRouter();
    const dispatch = useDispatch();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const traductor = useTraductor();
    const service:UnitOfWorkService = new UnitOfWorkService();

    const ordersNavOptions = [
        {
            label: traductor('enviados', {onlyfirst:true}),
            icon: null,
        }
        /*{
            label: "Recibidos",
            icon: null,
        },*/
    ];

    const [orders, setOrders] = useState([] as IOrder[])
    const [navValue, setNavValue] = useState(0);

    const centers:ICenter[] = useSelector((state: any) => state.centers.centers);
    const suppliers:ISeller[] = useSelector((state: any) => state.providers);
    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);

    useEffect(() => {

        useCheckTokenInvalid(() => {            
            
            service.getTokenService().removeToken();            
            router.push("/");

        });

        new UnitOfWorkUseCase().getOrdersDoneUseCase().getOrdersDone().then((resp: IServerResponse<Array<IOrder>>) => {

            if (resp.ServerData?.Data && resp.ServerData?.Data.length === 0) {

                dispatch(
                    notify.showNotification({
                        type: 'confirm',
                        title: 'Info',
                        message: traductor('sin_pedidos', {onlyfirst:true}),
                        onlyOk: true,
                        textOk: 'OK',
                        onOk:() => {
                            router.push('/home')
                        }
                    })
                )

            } else
                setOrders(resp.ServerData?.Data || [])

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
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSeeBreakDown = (order:IOrder) => {

        router.push('/breakdown')
    }

    const onRepeatOrder = (order:IOrder) => {
        
        dispatch(cartActions(reduxErrorCallback).saveCenterToCart(centers.find( (c:ICenter) => c.id === order.center.centerId ) || null));
        dispatch(cartActions(reduxErrorCallback).saveSupplierToCart(suppliers.find( (s:ISeller) => s.id === order.seller.sellerId ) || null));
        order.products.forEach( (p:IProduct) => {
            dispatch(cartActions(reduxErrorCallback).saveProductToCart(p));
        });
        router.push('/checkout');
        
    }

    const onHandleNavChangeOption = (_: any, selected: any) => {
        setNavValue(selected)

        switch (selected) {
            case 0:
                
                break;

            case 1:
                
                break;
        }
    }

    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                title={traductor('listado_orders', {onlyfirst:true})}
                searchEnabled={false}
                backIcon={true}
                showSwitch = {false}
            />
            <TopNavigation
                style={{ position: 'inherit' }}
                handleNavChange={onHandleNavChangeOption}
                navValue={navValue}
                navOptions={ordersNavOptions}

            />
            {
                isDesktop
                ?   <OrderCards 
                        orders={orders} 
                        onSeeBreakDown={onSeeBreakDown}
                        onRepeatOrder={onRepeatOrder}
                    />
                :   <OrderList 
                        orders={orders} 
                        onSeeBreakDown={onSeeBreakDown}
                        onRepeatOrder={onRepeatOrder}
                    />
            }
            {cartProducts.length && <CartTooltip color='orange' bottom = {'20px'}/>}
        </>
    )
}

export default createWrapper(useStore).withRedux(HistoryOrders);

