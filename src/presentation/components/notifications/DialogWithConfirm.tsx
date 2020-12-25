import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notificationActions from 'src/redux/notifications/actions'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTraductor } from 'src/hooks/Traductor';

export default function AlertDialog() {
    
    const dispatch = useDispatch();
    const traductor = useTraductor();
    const {
        show,
        title='',
        message='',
        textOk='Ok',
        textClose = traductor('cerrar', {onlyfirst:true}),
        onOk=()=>{},
        onClose=()=>{},
        onlyOk=false,
    } = useSelector((state: any) => state.notifications);

    const handleClose = (action: any) => {
        switch (action) {
            case 'close':
                onClose();
                dispatch(notificationActions.hideNotification());
                break;
            case 'ok':
                onOk();
                dispatch(notificationActions.hideNotification());
                break;
            default:
                return;
        }
    };

    return (
        <Dialog
            open={show}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {!onlyOk &&
                    <Button onClick={() => handleClose('close')} color="primary">
                        {textClose}
                    </Button>
                }
                <Button onClick={() => handleClose('ok')} color="primary" autoFocus>
                    {textOk}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
