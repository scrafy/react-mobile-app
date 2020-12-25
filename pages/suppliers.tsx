import React from 'react'
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { IProduct, ISeller } from 'src/domain/interfaces';
import AppBar from 'src/presentation/components/appBar/AppBar';
import CartTooltip from 'src/presentation/components/tooltip/CartTooltip';
import SupplierList from 'src/presentation/components/supplier/SupplierList';
import SupplierCards from 'src/presentation/components/supplier/SupplierCards';
import { useTraductor } from 'src/hooks/Traductor';
import { useRouter } from 'next/router'
import useStore from 'src/redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';

function Suppliers() {

    //useCheckTokenInvalid();
    
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const traductor = useTraductor();

    const suppliers: ISeller[] = useSelector((state: any) => state.providers);
    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);

    return (
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                title={traductor('listado_suppliers', { onlyfirst: true })}
                searchEnabled={false}
                backIcon={true}
                showSwitch={false}
            />
            {
                isDesktop
                    ? <SupplierCards suppliers={suppliers} />
                    : <SupplierList suppliers={suppliers} />
            }
            {cartProducts.length && <CartTooltip color='orange' bottom={'20px'} />}
        </>
    )
}

export default createWrapper(useStore).withRedux(Suppliers);

