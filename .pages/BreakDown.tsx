import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

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
import { IProduct } from 'src/domain/interfaces';

import CartTooltip from 'src/presentation/components/tooltip/CartTooltip';
import AppBar from 'src/presentation/components/appBar/AppBar';
import { useTraductor } from 'src/hooks/Traductor';

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
    },
});


const BreakDown = (props: any) => {

    const classes = useStyles();
    const history = useHistory();
    const traductor = useTraductor();

    useCheckTokenInvalid();


    const cartProducts: IProduct[] = useSelector((state: any) => state.cart.products);

    const [products, setProducts] = useState(props.location.state.products);
    const [order, setOrder] = useState(props.location.state);


    return (
        <>
            <AppBar
                backIcon
                title='Desglose'
                handleClickMenu={(e: any) => history.goBack()}
                showSwitch={false}
            />
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>{traductor('producto', {onlyfirst:true})}</TableCell>
                            <TableCell align={'left'}>{traductor('precio', {onlyfirst:true})}</TableCell>
                            <TableCell align={'center'}>{traductor('cantidad', {onlyfirst:true})}</TableCell>
                            <TableCell align={'left'}>{traductor('base', {onlyfirst:true})}</TableCell>
                            <TableCell align={'left'} >{traductor('impuestos', {onlyfirst:true})}</TableCell>
                            <TableCell align={'left'}>{traductor('total_impuestos', {onlyfirst:true})}</TableCell>
                            <TableCell align={'left'}>{traductor('total', {onlyfirst:true})}</TableCell>
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
                        <TableCell>{traductor('total', {uppercase:true})}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align={'center'}>{order.totalProducts}</TableCell>
                        <TableCell align={'left'}>{`${order.totalBase}€`}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align={'left'}>{`${order.totalTaxes}€`}</TableCell>
                        <TableCell align={'left'}>{`${order.total}€`}</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
            {cartProducts.length && <CartTooltip color='orange' bottom={'10px'} />}
        </>
    )
};

export default BreakDown;