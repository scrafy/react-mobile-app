import React, { useEffect } from 'react';
import showNotification from "src/presentation/components/notifications";
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import { TaxType } from 'src/domain/enums';
import { IProduct, IOrder, IServerResponse } from 'src/domain/interfaces';
import AppBar from 'src/presentation/components/appBar/AppBar';
import { useTraductor } from 'src/hooks/Traductor';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import { useRouter } from 'next/router';
import { ITokenService } from 'src/infraestructure/interfaces';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase';

const useStyles = makeStyles({

    container: {
        overflow: 'auto',
        height: 'calc(100vh - 80px)',
        marginTop: 80,
        padding: '0 1rem'
    },

    table: {
        marginBottom: 50,
    },

    bottomRow: {
        borderTop: '2px solid #333',
    }

});


const BreakDown = (props: any) => {

    const classes = useStyles();
    const traductor = useTraductor();
    const router = useRouter();
    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    const products: IProduct[] = props.order.products;
    const order: IOrder = props.order;

    useEffect(() => {

        useCheckTokenInvalid(() => {

            tokenService.removeToken();
            router.push("/");

        });

    }, [])


    return (
        <>
            <AppBar
                backIcon
                title='Desglose'
                handleClickMenu={(e: any) => router.back()}
                showSwitch={false}
            />
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>{traductor('producto', { onlyfirst: true })}</TableCell>
                            <TableCell align={'left'}>{traductor('precio', { onlyfirst: true })}</TableCell>
                            <TableCell align={'center'}>{traductor('cantidad', { onlyfirst: true })}</TableCell>
                            <TableCell align={'left'}>{traductor('base', { onlyfirst: true })}</TableCell>
                            <TableCell align={'left'} >{traductor('impuestos', { onlyfirst: true })}</TableCell>
                            <TableCell align={'left'}>{traductor('total_impuestos', { onlyfirst: true })}</TableCell>
                            <TableCell align={'left'}>{traductor('total', { onlyfirst: true })}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((p: IProduct) => (
                                <TableRow key={p.id}>
                                    <TableCell align={'left'}>{p.name}</TableCell>
                                    <TableCell align={'left'}>{`${p.price}€`}</TableCell>
                                    <TableCell align={'center'}>{p.amount}</TableCell>
                                    <TableCell align={'left'}>{`${p.totalBase}€`}</TableCell>
                                    <TableCell align={'left'}>
                                        {
                                            p.tax !== TaxType.NO_DEFINIDO
                                                ? `${TaxType[p.tax]} ${p.rate}%`
                                                : ''
                                        }
                                    </TableCell>
                                    <TableCell align={'left'}>{`${p.totalTaxes}€`}</TableCell>
                                    <TableCell align={'left'}>{`${p.total}€`}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableRow className={classes.bottomRow}>
                        <TableCell>{traductor('total', { uppercase: true })}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align={'center'}>{order.totalProducts}</TableCell>
                        <TableCell align={'left'}>{`${order.totalBase}€`}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align={'left'}>{`${order.totalTaxes}€`}</TableCell>
                        <TableCell align={'left'}>{`${order.total}€`}</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
             {showNotification()}

        </>
    )
};


export async function getServerSideProps({ req, query }) {

    try {

        const tokenService: ITokenService = new UnitOfWorkService().getTokenService();
        if (!req.cookies["session"])
            throw new Error("Session not valid");

        if (!tokenService.isTokenValid(req.cookies["session"]))
            throw new Error("Session not valid");

        const useCase: UnitOfWorkUseCase = new UnitOfWorkUseCase().getOrdersDoneUseCase();
        const orders: IServerResponse<IOrder[]> = await useCase.getOrdersDone(query.order, req.cookies["session"]);
        
        return {
            props: { order:orders.ServerData.Data[0] }
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

export default BreakDown;
