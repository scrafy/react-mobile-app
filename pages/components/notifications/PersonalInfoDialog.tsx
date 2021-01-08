import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notificationActions from 'src/redux/notifications/actions'
import { Container, createStyles, makeStyles, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { ChangePassword } from 'src/domain/models';
import { IChangePassword, IServerResponse } from 'src/domain/interfaces';
import ErrorFormManager from 'pages/helpers/ErrorFormManager';
import { useHistory } from 'react-router-dom';
import { useTraductor } from 'src/hooks/Traductor';


const useStyles = makeStyles(() => createStyles({

    submit: {
        margin: '20px auto',
        width: '100%',
        borderRadius: '20px',
        backgroundColor: '#1976D3',
    },
    changepassword: {
        color: 'blue',
        margin: '15px 0',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));


export default function PersonalInfoDialog() {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const traductor = useTraductor();

    const [info, setInfo] = useState({} as any);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [_severity, setSeverity] = useState('success' as "info" | "success" | "error" | "warning" | undefined);
    const [snackMessage, setSnackMessage] = useState(traductor('personal_info_dialog_mensaje', {onlyfirst:true}))
    const [showMessage, setShowMessage] = useState(false)
    const [showChangePasswordPanel, setShowChangePasswordPanel] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationErrors, setValidationErrors] = useState({} as any)

    const { show } = useSelector((state: any) => state.notifications);

    useEffect(() => {

        try {

            setInfo(new UnitOfWorkService().getTokenService().getPayload());
        }
        catch (error) {

            history.push("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
        dispatch(notificationActions.hideNotification());
    };

    const cleanForm = () => {

        setOldPassword('');
        setConfirmPassword('');
        setNewPassword('');

    };

    const onChangePassword = () => {

        const model: IChangePassword = new ChangePassword();
        model.confirmPassword = confirmPassword;
        model.newPassword = newPassword;
        model.oldPassword = oldPassword;

        new UnitOfWorkUseCase().getChangePasswordUseCase().changePassword(model).then((resp: IServerResponse<string>) => {
            cleanForm();
            setSnackMessage(traductor('personal_info_dialog_mensaje', {onlyfirst:true}));
            setShowChangePasswordPanel(false);
            setValidationErrors({});
            setSeverity("success");
            setShowMessage(true);
        }).catch(error => {
            ErrorFormManager(error, (errorMessage: string, validationErrors?: any) => {

                if (validationErrors)
                    setValidationErrors(validationErrors);
                else {
                    cleanForm();
                    setSnackMessage(error.message);
                    setSeverity("error");
                    setShowMessage(true);
                    setValidationErrors({});
                }

            });
        })
    }

    return (

        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{'Información personal'}</DialogTitle>
            <DialogContent>
                {showMessage && <Alert onClose={e => setShowMessage(false)} severity={_severity}>
                    {snackMessage}
                </Alert>}
                <Container>
                    
                    <TextField
                        label={traductor('usuario', {onlyfirst:true})}
                        fullWidth
                        value={info.username}
                        margin="normal"
                        variant="standard"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={info.email}
                        margin="normal"
                        variant="standard"
                    />
                    <TextField
                        label={traductor('telefono', {onlyfirst:true})}
                        fullWidth
                        value={info.phone}
                        margin="normal"
                        variant="standard"
                    />
                </Container>

                <Container>
                    {!showChangePasswordPanel && <Typography align='right' variant='subtitle2' className={classes.changepassword} onClick={e => setShowChangePasswordPanel(true)}>
                    {traductor('cambiar_contraseña', {onlyfirst:true})}
                </Typography>}
                    {showChangePasswordPanel && <Typography align='right' variant='subtitle2' className={classes.changepassword} onClick={e => {setValidationErrors({});setShowChangePasswordPanel(false)}}>
                    {traductor('cerrar', {onlyfirst:true})}
                </Typography>}
                </Container>
                {showChangePasswordPanel && <Container>
                    <TextField
                        error={validationErrors.OldPassword ? true : false}
                        helperText={validationErrors.OldPassword}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="oldPassword"
                        label={traductor('contraseña_vieja', {onlyfirst:true})}
                        name="oldPassword"
                        value={oldPassword}
                        autoFocus
                        onChange={e => setOldPassword(e.target.value)}
                    />
                    <TextField
                        error={validationErrors.NewPassword ? true : false}
                        helperText={validationErrors.NewPassword}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={traductor('nueva_contraseña', {onlyfirst:true})}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}

                    />
                    <TextField
                        error={validationErrors.ConfirmPassword ? true : false}
                        helperText={validationErrors.ConfirmPassword}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmpassword"
                        label={traductor('confirmar_contraseña', {onlyfirst:true})}
                        type="password"
                        id="confirmpassword"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}

                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => onChangePassword()}
                    >
                         {traductor('cambiar_contraseña', {onlyfirst:true})}
                </Button>
                </Container>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                {traductor('cerrar', {uppercase:true})}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
