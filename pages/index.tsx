import { IServerResponse } from 'src/domain/interfaces'
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { Login } from 'src/domain/models/Login';
import showNotification from "src/presentation/components/notifications";
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
import { useCheckTokenValid } from 'src/hooks/CheckTokenSession';
import ErrorFormManager from 'src/presentation/helpers/ErrorFormManager';
import notify from 'src/redux/notifications/actions';
import { useDispatch } from 'react-redux';
import { useTraductor } from 'src/hooks/Traductor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import userActions from "src/redux/users/actions";
import { ITokenService } from 'src/infraestructure/interfaces';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';
import store from "src/redux/store";
import centerActions from 'src/redux/centres/actions';
import catalogActions from 'src/redux/catalogs/actions';
import cartActions from 'src/redux/cart/actions';
import useReduxErrorCallback from 'src/hooks/ReduxErrorCallback';

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
        fontWeight: 'bold'
    },
    recoverPassword: {

        display: 'block',
        fontWeight: 'bold',
        textAlign: 'right',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));



const SingIn = (props: any) => {

    const [userName, setUserName] = useState('jljustemartin@gmail.com')
    const [password, setPassword] = useState('Compaq7500')
    const [validationErrors, setValidationErrors] = useState({} as any)


    const router = useRouter();
    const classes = useStyles();
    const dispatch = useDispatch();
    const traductor = useTraductor();
    const reduxErrorCallback = useReduxErrorCallback();

    const useCase = new UnitOfWorkUseCase().getLoginUseCase();
    const tokenService: ITokenService = new UnitOfWorkService().getTokenService();

    useEffect(() => {

        useCheckTokenValid(() => {
            router.push("/home");
        });

        if (props.username) {

            setUserName(props.username)
            setPassword('');


        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const cleanForm = () => {

        setUserName('');
        setPassword('');
    };

    const onLogin = () => {


        const login = new Login();
        login.username = userName;
        login.password = password;
        useCase.login(login).then((response: IServerResponse<string>) => {

            const userId: string = tokenService.getClaimFromToken("userId");
            const storedUserId: string = store.getState().userId;
            dispatch(userActions((error) => { }).saveUserId(tokenService.getClaimFromToken("userId")));
            if (userId !== storedUserId) {
                dispatch(cartActions(reduxErrorCallback).cleanCart);
                dispatch(centerActions(() => { }).getCenterProducts(null));
                dispatch(centerActions(() => { }).saveCenter(null));
                dispatch(catalogActions(() => { }).saveCatalog(null)).then(() => {
                    router.push('/home');
                });
            } else
                router.push('/home');

        }).catch((error) => {

            ErrorFormManager(error, (errorMessage: string, validationErrors?: any) => {

                if (validationErrors)
                    setValidationErrors(validationErrors);
                else {
                    cleanForm();
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
                        {traductor("iniciar_sesion", { uppercase: true })}
                    </Typography>
                    <Container component="main" maxWidth="xs">
                        <TextField
                            error={validationErrors.Username ? true : false}
                            helperText={validationErrors.Username}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label={traductor("usuario", { onlyfirst: true })}
                            name="username"
                            value={userName}
                            autoFocus
                            onChange={e => setUserName(e.target.value)}
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
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}

                        />
                        <Link variant="body2" onClick={(e: any) => router.push('/recoverpassword')} className={classes.recoverPassword}>
                            {traductor("recordar_password", { onlyfirst: true })}
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onLogin}
                        >
                            {traductor("iniciar", { uppercase: true })}
                        </Button>
                        <Grid container justify="center" className={classes.bottom}>
                            <Grid item>
                                {traductor("nuevo_usuario", { capitalize: true })}
                                {' '}
                                <Link variant="body2" onClick={(e: any) => router.push('/validatecenter')} className={classes.signup}>
                                    {traductor("crear_cuenta", { onlyfirst: true })}
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

    return { props: { username: query.username || null } };
}

export default SingIn;





