import React, { useState } from 'react'
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase'
import { useHistory } from "react-router-dom";
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
//import pedidoE_logo from '/pedidoE-72x72.png';
import { useCheckTokenValid } from 'src/hooks/CheckTokenSession';
import ErrorFormManager from 'src/presentation/helpers/ErrorFormManager'
import notify from 'src/redux/notifications/actions';
import { useDispatch } from 'react-redux';
import { useTraductor } from 'src/hooks/Traductor';
import { IEmail, IServerResponse } from 'src/domain/interfaces';
import { Email } from 'src/domain/models';


const useStyles = makeStyles(() => createStyles({
    background: {
        background: 'linear-gradient(#1976D3 0%,#1976D3 35%,#E6E6E6 35%,#E6E6E6 100%)',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
    },
    wrapper: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    avatar: {
        margin: '40px auto',
        backgroundColor: 'white',
    },
    avatarRoot: {
        height: '100px',
        width: '100px',
    },
    paper: {
        margin: 'auto',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        color: '#50AD4F',
        fontWeight: 600,
        marginTop: '2rem',
    },
    submit: {
        margin: '20px auto',
        width: '100%',
        borderRadius: '20px',
        backgroundColor: '#1976D3',
    },
    bottom: {
        margin: '10px auto'
    },
    signup: {
        fontWeight: 'bold',
    }
}));


const RecoverPassword = (props: any) => {

    const [email, setEmail] = useState('')
    const [validationErrors, setValidationErrors] = useState({} as any)


    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();


    useCheckTokenValid();


    const onSubmit = () => {

        const _email: IEmail = new Email();
        _email.email = email;
        new UnitOfWorkUseCase().getRecoverPasswordUseCase().recoverPassword(_email).then((resp: IServerResponse<string>) => {

            dispatch(
                notify.showNotification({
                    type: 'confirm',
                    title: 'Info',
                    message: traductor('mensaje_password_cambiado', { onlyfirst: true }),
                    onlyOk: true,
                    textOk: 'OK',
                    onOk: () => history.push('/')
                })
            )

        }).catch(error => {

            ErrorFormManager(error, (errorMessage: string, validationErrors?: any) => {

                if (validationErrors)
                    setValidationErrors(validationErrors);
                else {
                    dispatch(
                        notify.showNotification({
                            type: 'confirm',
                            title: 'Error',
                            message: error.message,
                            onlyOk: true,
                            textOk: 'OK',
                        })
                    )
                    setValidationErrors({});
                }

            });
        });

    }

    return (
        <div className={classes.background}>
            <div className={classes.wrapper}>
                <Avatar
                    className={classes.avatar}
                    classes={{ root: classes.avatarRoot }}
                    src={'/pedidoE-72x72.png'}
                    alt="PedidoE"
                />
                <Paper className={classes.paper}>
                    <Typography
                        className={classes.title}
                        component="h1"
                        variant="h5"
                    >
                        {traductor('cambiar_password', { uppercase: true })}
                    </Typography>
                    <Container component="main" maxWidth="xs">

                        <TextField
                            error={validationErrors.Email ? true : false}
                            helperText={validationErrors.Email}
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label={traductor('email', { onlyfirst: true })}
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            {traductor('enviar', { uppercase: true })}
                        </Button>

                    </Container>
                </Paper>
            </div>
        </div>
    );

}

export default RecoverPassword

