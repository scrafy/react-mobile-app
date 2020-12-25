import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notificationActions from 'src/redux/notifications/actions'
import {

    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CardMedia,
    Typography,
    
} from '@material-ui/core';
import { useTraductor } from 'src/hooks/Traductor';

export default function FormDialog() {

    const dispatch = useDispatch();
    const traductor = useTraductor();

    const {
        show,
        title = traductor('supplier_titulo_dialogo', {onlyfirst:true}),
        textClose = traductor('cerrar', {onlyfirst:true}),
        selectedSupplier: {
            companyName = '',
            address = '',
            city = '',
            email = '',
            postalCode = '',
            province = '',
            imageUrl = '',
        },
    } = useSelector((state: any) => state.notifications);

    const handleClose = () => {
        dispatch(notificationActions.hideNotification());
    };

    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <CardMedia
                style={{ height: '12rem', backgroundSize: 'contain' }}
                image={imageUrl}
                title={companyName}
            />
            <DialogContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {companyName}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                    {email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`${city}, ${postalCode}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {province}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    {textClose}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
