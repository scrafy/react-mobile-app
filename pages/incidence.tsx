import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Button, TextField, useMediaQuery, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Incidence as _Incidence } from 'src/domain/models';
import { IIncidence } from 'src/domain/interfaces';
import { UnitOfWorkUseCase } from 'src/application/unitsofwork';
import { useCheckTokenInvalid } from 'src/hooks/CheckTokenSession';
import ErrorFormManager from 'src/presentation/helpers/ErrorFormManager';
import AppBar from 'src/presentation/components/appBar/AppBar';
import notify from 'src/redux/notifications/actions';
import { useTraductor } from 'src/hooks/Traductor';
import useStore from 'src/redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { useRouter } from 'next/router'
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';

const useStyles = makeStyles({
    button: {
        backgroundColor: '#2196F3',
        color: 'white',
    },
    container: {
        marginTop: '100px',
        display: 'block',
        marginBottom: '80px',
        overflow: 'auto',
        height: 'calc(100vh - 130px)',
    },

});

const Incidence = () => {

    // useCheckTokenInvalid();

    const traductor = useTraductor();
    const router = useRouter();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(min-width:600px)');
    const [validationErrors, setValidationErrors] = useState({} as any)
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [file, setFile] = useState(null as string | null)
    const [nameFile, setNameFile] = useState(null as string | null)
    const [_severity, setSeverity] = useState('success' as "info" | "success" | "error" | "warning" | undefined);
    const [snackMessage, setSnackMessage] = useState(traductor('incidencia_creada', { onlyfirst: true }))
    const [showMessage, setShowMessage] = useState(false)



    useEffect(() => {

        useCheckTokenInvalid(() => {

            const service: UnitOfWorkService = new UnitOfWorkService();
            service.getTokenService().removeToken();
            service.getStateService().saveUserId(null);
            router.push("/");

        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fileReader = (fileName: Blob) => {

        var fReader = new FileReader();
        fReader.readAsBinaryString(fileName);
        fReader.onload = (event: Event) => {
            console.log(btoa(fReader.result as string))
            setFile(btoa(fReader.result as string));
        };
    }

    const cleanForm = () => {

        setSubject('');
        setBody('');
        setNameFile(null);
        setFile(null);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const onCreateIncidence = () => {

        const model: IIncidence = new _Incidence();
        model.Body = body;
        model.Subject = subject;
        model.File = file ?? undefined;
        new UnitOfWorkUseCase().getCreateIncidenceUseCase().createIncidence(model).then(resp => {

            cleanForm();
            setSnackMessage(traductor('incidencia_creada', { onlyfirst: true }));
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
        <>
            <AppBar
                handleClickMenu={(e: any) => router.back()}
                title={traductor('abrir_incidencia', { onlyfirst: true })}
                searchEnabled={false}
                backIcon={true}
                showSwitch={false}
            />
            <Container className={classes.container}>

                {
                    showMessage &&
                    <Alert onClose={e => setShowMessage(false)} severity={_severity}>
                        {snackMessage}
                    </Alert>
                }
                <Grid
                    container
                    direction="column"
                    spacing={2}
                >
                    <Grid item sm={5}>
                        <TextField
                            error={validationErrors.Subject ? true : false}
                            helperText={validationErrors.Subject}
                            required
                            autoFocus
                            fullWidth
                            size={'small'}
                            margin={'dense'}
                            label={traductor('asunto', { onlyfirst: true })}
                            name={"subject"}
                            variant={"outlined"}
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={7}>
                        <TextField
                            id="mensaje"
                            error={validationErrors.Body ? true : false}
                            helperText={validationErrors.Body}
                            label={traductor('mensaje', { onlyfirst: true })}
                            multiline
                            required
                            fullWidth
                            rows={10}
                            variant="outlined"
                            name="body"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        container
                        direction={"column"}
                        // justify={"center"}
                        alignItems={isMobile ? "flex-start" : "center"}
                    >
                        <Grid item xs={12} style={{ margin: '8px 10px' }}>
                            <Button
                                variant="contained"
                                component="label"
                                className={classes.button}
                            >
                                {traductor('seleccionar_archivo', { onlyfirst: true })}
                                <input
                                    type="file"
                                    hidden
                                    onChange={e => {

                                        if (e.target.files && e.target.files.length > 0) {

                                            if (((e.target.files[0].size / 1024) / 1024) > 4)
                                                dispatch(
                                                    notify.showNotification({
                                                        type: 'confirm',
                                                        title: 'Error',
                                                        message: (traductor('tamaño_fichero_error_mensage', { onlyfirst: true }) as string).replace('{0}', (Math.trunc((((e.target.files[0].size / 1024) / 1024) * 100)) / 100).toString()),
                                                        onlyOk: true,
                                                        textOk: 'OK',
                                                    })
                                                )
                                            else {
                                                setNameFile(e.target.files[0].name);
                                                fileReader(e.target.files[0]);
                                            }
                                        }

                                    }}
                                />
                            </Button>
                            <Typography style={{ marginTop: '10px' }}>
                                {nameFile}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ margin: '20px 10px 0' }}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={onCreateIncidence}
                            >
                                {traductor('enviar', { onlyfirst: true })}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default createWrapper(useStore).withRedux(Incidence);

