import React from 'react'
import { Tooltip, makeStyles, IconButton } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    tooltip: ({ color, bottom }:any) => ({
        position: 'fixed',
        bottom,
        right: '22px',
        backgroundColor: color,
        '&:hover': {
            backgroundColor: color
        }
    })
});

function CartTooltip({
    color = 'orange',
    bottom = '72px',
}: any) {

    const classes = useStyles({color, bottom});
    const router = useRouter();

    return (

        <Tooltip 
            title="Realizar pedido" 
            aria-label="add" 
            className={classes.tooltip}>
            <IconButton 
                onClick={() => router.push('/checkout')}
                color="primary" 
                aria-label="add to shopping cart"
            >
                <ShoppingCartOutlined />
            </IconButton>
        </Tooltip >
    )
}

export default CartTooltip
