import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Typography,
    Button,
} from '@material-ui/core';
import { Check } from '@material-ui/icons'
import { useTraductor } from 'src/hooks/Traductor';

const useStyles = makeStyles({
    container: {
        height: '100vh',
        overflow: 'hidden',
    },
    avatar: {
        backgroundColor: '#687089',
        width: '80px',
        height: '80px',
    },
    icon: {
        width: '2em',
        height: '2em',
    },
    title: {
        marginTop: '10px',
        color: '#2196F3',
    },
    text: {
        color: '#2196F3',
    },
    button: {
        marginTop: '5rem',
        backgroundColor: '#2196F3',
        color: 'white',
    },
});


const BreakDown = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const traductor = useTraductor();



    const onClickButton = (e: any) => {

        history.push('/home');
    }

    return (
        <>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                className={classes.container}
            >
                <Grid item>
                    <Avatar className={classes.avatar}>
                        <Check className={classes.icon} />
                    </Avatar>
                </Grid>
                <Grid item className={classes.title}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {traductor('felicidades', { onlyfirst: true })}
                    </Typography>
                </Grid>
                <Grid item className={classes.text}>
                    <Typography variant="body1" component="p">
                        {traductor('pedido_realizado', { onlyfirst: true })}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={onClickButton}
                    >
                        {traductor('volver_inicio', { onlyfirst: true })}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
};

export default BreakDown;