import React from 'react';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';

import { IOrder } from 'src/domain/interfaces';

const useStyles = makeStyles({
    container: {
        marginTop: '10px',
        height: 'calc(100vh - 155px)',
        overflow: 'auto',
    },
    root: {
        maxWidth: 290,
        margin: '10px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        height: 220,
    },
    contentGrid: {
        height: '100%',
    },
    media: {
        backgroundSize: 'contain',
        height: 160,
    },
    actions: {
        justifyContent: 'space-between',
    },
});

const OrderCards = ({ orders = [], onSeeBreakDown, onRepeatOrder }: any) => {
    const classes = useStyles();

    return (
        <Grid container wrap={'wrap'} className={classes.container}>
            {
                orders.map((order: IOrder) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
                        <Card className={classes.root}>
                            <CardContent className={classes.content}>
                                <Grid
                                    className={classes.contentGrid}
                                    container
                                    direction="column"
                                    justify="space-between"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {order.center.centerName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {order.seller.sellerName}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {`#${order.id} - ${order.total}€`}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={(e: any) => onSeeBreakDown(order)}
                                >
                                    {'Ver desglose'}
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={(e: any) => onRepeatOrder(order)}
                                >
                                    {'Repetir pedido'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
};

export default OrderCards;