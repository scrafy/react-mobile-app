import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Avatar,
    Typography,
    Button,
} from '@material-ui/core';
import { Check } from '@material-ui/icons'
import { useTraductor } from 'src/hooks/Traductor';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

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
    text: {
        color: 'black',
        marginTop: '4rem'
    },
    button: {
        marginTop: '3rem',
        backgroundColor: '#2196F3',
        color: 'white',
    },
});


const Error = ({ errorMessage }) => {

    const classes = useStyles();
    const router = useRouter();
    const traductor = useTraductor();



    const onClickButton = (e: any) => {

        router.push('/home');
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
                <Grid item className={classes.text}>
                    <Typography variant="h4" component="p">
                        {errorMessage}
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

export async function getServerSideProps({ query }) {

    return { props: { errorMessage: query.error } };
}

export default Error;