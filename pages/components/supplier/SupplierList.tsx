import React from 'react';
import { useDispatch } from 'react-redux';
import {
    makeStyles,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    List,
} from '@material-ui/core';
import Comment from '@material-ui/icons/Comment';
import { ISeller } from 'src/domain/interfaces';

import notify from 'src/redux/notifications/actions';
import { useTraductor } from 'src/hooks/Traductor';

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
        marginTop: '60px',
        height: 'calc(100vh - 60px)',
        overflow: 'auto',
    }
});

const SupplierList = ({ suppliers=[] }: any) => {
    

    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();

    const onSellerInforClick = (selectedSupplier: ISeller) => {
        dispatch(
            notify.showNotification({
                type: 'supplier',
                selectedSupplier,
            })
        )
    };

    return (
        <List className={classes.supplierList}>
            {
                suppliers.map((supplier: ISeller, index: any) => (
                    <React.Fragment key={index}>
                        <ListItem className={classes.main}>
                            <ListItemAvatar>
                                <Avatar 
                                    className={classes.avatar} 
                                    variant='square' 
                                    src={supplier.imageUrl}
                                    imgProps={{
                                        style: { objectFit: 'contain' }
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={supplier.companyName}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip 
                                    title={traductor('supplier_titulo_dialogo', {onlyfirst:true})}
                                    placement="left"
                                >
                                    <IconButton 
                                        edge="end"
                                        onClick={(e: any) => onSellerInforClick(supplier)}
                                    >
                                        <Comment />
                                    </IconButton>
                                </Tooltip> 
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))
            }
        </List>
    )
};

export default SupplierList;
