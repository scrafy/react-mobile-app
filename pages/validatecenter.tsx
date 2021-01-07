import React, { useState } from 'react'
import { IAccountCentreCode, IEmail, IServerResponse, IUserProfile } from 'src/domain/interfaces'
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase'
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import  ErrorFormManager  from './helpers/ErrorFormManager'
import notify from 'src/redux/notifications/actions';
import { useDispatch } from 'react-redux';
import useStore from 'src/redux/store';
import { AccountCentreCode, Email } from 'src/domain/models';
import { useTraductor } from 'src/hooks/Traductor';
import { useRouter } from 'next/router';
import { createWrapper } from 'next-redux-wrapper';


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


const ValidateCenter = (props: any) => {

    const [activationCode, setActivationCode] = useState('')
    const [email, setEmail] = useState('')
    const [validationErrors, setValidationErrors] = useState({} as any)


    const router = useRouter();
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();


    const onSubmit = () => {

        if (activationCode === '') {
            setValidationErrors({ CentreCode: traductor('error_validacion_codigo_activacion', { onlyfirst: true }) })
            return;
        }

        const _email: IEmail = new Email();
        _email.email = email;
        new UnitOfWorkUseCase().getCheckUserEmailUseCase().checkUserEmail(_email).then((resp: IServerResponse<string>) => {


            if (resp.ServerData?.Data && resp.ServerData?.Data === "True") {

                const useCase = new UnitOfWorkUseCase().getAssociateAccountToCentreCodeUseCase();
                const data: IAccountCentreCode = new AccountCentreCode();
                data.centreCode = activationCode;
                data.email = email;
                useCase.associateAccountToCentreCode(data).then((response: IServerResponse<IUserProfile>) => {

                    router.push({
                        pathname: '/',
                        query: { username: response.ServerData?.Data.username }
                    }, '')


                }).catch((error) => {

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
                })

            } else {
                router.push({
                    pathname: '/singup',
                    query: {
                        activationcode: activationCode,
                        email
                    }
                }, '')
            }

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
                    src={'pedidoE-72x72.png'}
                    alt="PedidoE"
                />
                <Paper className={classes.paper}>
                    <Typography
                        className={classes.title}
                        component="h1"
                        variant="h5"
                    >
                        {traductor('cod_activacion_titulo', { uppercase: true })}
                    </Typography>
                    <Container component="main" maxWidth="xs">
                        <TextField
                            error={validationErrors.CentreCode ? true : false}
                            helperText={validationErrors.CentreCode}
                            margin="normal"
                            required
                            fullWidth
                            id="activationcode"
                            label={traductor('cod_activacion', { onlyfirst: true })}
                            name="CentreCode"
                            value={activationCode}
                            autoFocus
                            onChange={e => setActivationCode(e.target.value)}
                        />
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

export async function getServerSideProps(ctx: any) {

    return { props: {} };
}


export default createWrapper(useStore).withRedux(ValidateCenter);

