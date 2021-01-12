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
import { ICenter } from 'src/domain/interfaces';

import notify from 'src/redux/notifications/actions';
import { useTraductor } from 'src/hooks/Traductor';

const useStyles = makeStyles({
    supplierList: {
        marginTop: '60px',
        height: 'calc(100vh - 60px)',
        overflow: 'auto',
    },
    main: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '50px',
        width: '100px',
        height: '100px',
    },
});

const CenterList = ({ centers=[] }: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();

    const onCenterInfoClick = (selectedCenter: ICenter) => {
        
        dispatch(
            notify.showNotification({
                type: 'center',
                selectedCenter,
            })
        )
    };

    return (
        <List className={classes.supplierList}>
            {
                centers.map((center: ICenter) => (
                    <React.Fragment key={center.id}>
                        <ListItem className={classes.main}>
                            <ListItemAvatar>
                                <Avatar 
                                    className={classes.avatar} 
                                    variant='square' 
                                    src={center.imageUrl}
                                    imgProps={{
                                        style: { objectFit: 'contain' }
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={center.name}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip 
                                    title={traductor('center_titulo_dialogo', {onlyfirst:true})}
                                    placement="left"
                                >
                                    <IconButton 
                                        edge="end"
                                        onClick={(e: any) => onCenterInfoClick(center)}
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

export default CenterList;
