import React, { useEffect } from 'react'
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
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';

function Suppliers() {

    
    const service:UnitOfWorkService = new UnitOfWorkService();
    const router = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const traductor = useTraductor();

    const suppliers: ISeller[] = useSelector((state: any) => state.providers);
    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);

    useEffect(() => {

        useCheckTokenInvalid(() => {
                        
            service.getTokenService().removeToken();
            router.push("/");

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
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

export async function getServerSideProps(ctx: any) {

    return { props: {} }
}


export default createWrapper(useStore).withRedux(Suppliers);

