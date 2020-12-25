import React from 'react';
import moment from 'moment';
import {
    makeStyles,
    ListItem,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    List,
    Typography,
} from '@material-ui/core';
import { Replay, List as ListIcon } from '@material-ui/icons';
import { IOrder } from 'src/domain/interfaces';

const useStyles = makeStyles({
    main: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '50px',
        width: '100px',
        height: '100px',
    },
    supplierList: {
        marginTop: '5px',
        height: 'calc(100vh - 155px)',
        overflow: 'auto',
    }
});

const OrderList = ({ orders=[], onSeeBreakDown, onRepeatOrder }: any) => {
    const classes = useStyles();

    return (
        <List className={classes.supplierList}>
            {
                orders.map((order: IOrder) => (
                    <React.Fragment key={order.id}>
                        <ListItem className={classes.main}>
                            <div style={{ display:'flex', flexDirection:'column' }}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {`#${order.id} - ${order.total}€`}
                                </Typography>
                                <ListItemText
                                    primary={order.center.centerName}
                                    secondary={order.seller.sellerName}
                                />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}
                                </Typography>
                            </div>
                            <ListItemSecondaryAction>
                                <div style={{ display:'flex', flexDirection:'column' }}>
                                    <Tooltip 
                                        title={'Ver desglose'} 
                                        placement="left"
                                    >
                                        <IconButton 
                                            edge="end"
                                            onClick={(e: any) => onSeeBreakDown(order)}
                                        >
                                            <ListIcon style={{ color: '#2196F3'}} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip 
                                        title={'Repetir pedido'} 
                                        placement="left"
                                    >
                                        <IconButton 
                                            edge="end"
                                            onClick={(e: any) => onRepeatOrder(order)}
                                        >
                                            <Replay style={{ color: '#2196F3'}} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))
            }
        </List>
    )
};

export default OrderList;
