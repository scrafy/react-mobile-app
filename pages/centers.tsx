import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { ICenter, IProduct } from 'src/domain/interfaces';
import AppBar from 'src/presentation/components/appBar/AppBar';
import CartTooltip from 'src/presentation/components/tooltip/CartTooltip';
import CenterList from 'src/presentation/components/centers/CenterList';
import CenterCards from 'src/presentation/components/centers/CenterCards';
import { useTraductor } from 'src/hooks/Traductor';
import useStore from 'src/redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { useRouter } from 'next/router'
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';

function Centers() {

   // useCheckTokenInvalid();

    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const traductor = useTraductor();

    const centers: ICenter[] = useSelector((state: any) => state.centers.centers);
    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);

    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                title={traductor('listado_center', { onlyfirst: true })}
                searchEnabled={false}
                backIcon={true}
                showSwitch={false}
            />
            {
                isDesktop
                    ? <CenterCards centers={centers} />
                    : <CenterList centers={centers} />
            }
            {cartProducts.length && <CartTooltip color='orange' bottom={'20px'} />}

        </>
    )
}

export default createWrapper(useStore).withRedux(Centers);

