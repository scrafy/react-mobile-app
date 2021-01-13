import React, { useEffect, useState } from 'react'
import { IServerResponse } from 'src/domain/interfaces'
import { UnitOfWorkUseCase } from 'src/application/unitsofwork/UnitOfWorkUseCase'
import { IUserProfile } from 'src/domain/interfaces'
import { Account } from 'src/domain/models/Account'
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ErrorFormManager from 'src/presentation/helpers/ErrorFormManager';
import { useTraductor } from 'src/hooks/Traductor';
import { useDispatch } from 'react-redux';
import notify from 'src/redux/notifications/actions';
import showNotification from "src/presentation/components/notifications";
import { useRouter } from 'next/router';

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
        marginBottom: '20px',
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
    signin: {
        fontWeight: 'bold',
    }
}));


const SingUp = (props: any) => {


    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [activationCode, setActivationCode] = useState('')
    const [validationErrors, setValidationErrors] = useState({} as any)

    const router = useRouter();
    const classes = useStyles();
    const traductor = useTraductor();
    const dispatch = useDispatch();


    useEffect(() => {

        if (props.email && props.activationcode) {

            setEmail(props.email);
            setActivationCode(props.activationcode);

        }

    }, [email, history, props]);

    const onCreateAccount = () => {

        const useCase = new UnitOfWorkUseCase().getCreateAccountUseCase()
        const account = new Account();
        account.Username = email;
        account.Password = password;
        account.ConfirmPassword = confirmPassword;
        account.Email = email;
        account.Phone = phone;
        account.CentreCode = activationCode;

        useCase.createAccount(account).then((response: IServerResponse<IUserProfile>) => {

            dispatch(
                notify.showNotification({
                    type: 'confirm',
                    title: 'Info',
                    message: traductor('cuenta_creada', { onlyfirst: true }),
                    onlyOk: true,
                    textOk: 'OK',
                    onOk: () => {
                        router.push({
                            pathname: '/',
                            query: { username: response.ServerData?.Data.username }
                        });
                    }
                })
            );

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

    }

    const onSingIn = () => {

        router.push('/')
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
                        {traductor('cuenta_nueva', { uppercase: true })}
                    </Typography>
                    <Container component="main" maxWidth="xs">
                        <TextField
                            error={validationErrors.Email ? true : false}
                            helperText={validationErrors.Email}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{ readOnly: true }}
                            name="email"
                            label={traductor("email", { onlyfirst: true })}
                            id="email"
                            value={email}
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            error={validationErrors.Password ? true : false}
                            helperText={validationErrors.Password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={traductor("contraseña", { onlyfirst: true })}
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            error={validationErrors.ConfirmPassword ? true : false}
                            helperText={validationErrors.ConfirmPassword}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label={traductor("confirmar_contraseña", { onlyfirst: true })}
                            type="password"
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <TextField
                            error={validationErrors.Phone ? true : false}
                            helperText={validationErrors.Phone}
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label={traductor("telefono", { onlyfirst: true })}
                            id="phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <TextField
                            error={validationErrors.CentreCode ? true : false}
                            helperText={validationErrors.CentreCode}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{ readOnly: true }}
                            name="activationcode"
                            label={traductor("cod_activacion", { onlyfirst: true })}
                            id="activationcode"
                            value={activationCode}
                            onChange={e => setActivationCode(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onCreateAccount}
                        >
                            {traductor("crear", { uppercase: true })}
                        </Button>
                        <Grid container justify="flex-end" className={classes.bottom}>
                            <Grid item>
                                <Link href="" variant="body2" onClick={onSingIn} className={classes.signin}>
                                    {traductor("iniciar_sesion", { onlyfirst: true })}
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
                {showNotification()}
            </div>
        </div>
    );

}

export async function getServerSideProps({ query }) {

    return { props: { email: query.email || null, activationcode: query.activationcode || null } }
}

export default SingUp;
