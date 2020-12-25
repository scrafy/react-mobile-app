import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash'
import notificationActions from 'src/redux/notifications/actions'

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CardMedia,
} from '@material-ui/core';
import { useTraductor } from 'src/hooks/Traductor';

export default function FormDialog() {

    const dispatch = useDispatch();
    const traductor = useTraductor();
    const {
        show,
        title = '',
        textOk = traductor('aceptar', { onlyfirst: true }),
        textClose = traductor('cancelar', { onlyfirst: true }),
        onOk = () => { },
        onClose = () => { },
        product = {},
    } = useSelector((state: any) => state.notifications);

    const [quantity, setQuantity] = React.useState(get(product, 'amount', 0));

    const handleClose = (action: any) => {
        switch (action) {
            case 'close':
                onClose();
                dispatch(notificationActions.hideNotification());
                break;
            case 'ok':
                onOk(quantity, product);
                dispatch(notificationActions.hideNotification());
                break;
            default:
                return;
        }
    };

    useEffect(() => {

        if (quantity < 0)
            setQuantity(0)
            
    }, [quantity])

    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{product.name || title}</DialogTitle>
            <CardMedia
                style={{ height: '12rem', backgroundSize: 'contain' }}
                image={product.imageUrl}
                title={product.name}
            />
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="product-qty-dialog"
                    label={traductor('seleccionar_cantidad', { onlyfirst: true })}
                    type="number"
                    value={quantity}
                    onChange={(e: any) => setQuantity(get(e, 'target.value', 0))}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose('close')} color="primary">
                    {textClose}
                </Button>
                <Button onClick={() => handleClose('ok')} color="primary" autoFocus>
                    {textOk}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
