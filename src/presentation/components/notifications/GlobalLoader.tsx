import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, makeStyles, Typography } from '@material-ui/core';

export default function GlobalLoader() {


    const useStyles = makeStyles({
        color: { color: 'white' }
    });

    const classes = useStyles();
    const { show } = useSelector((state: any) => state.notifications);

    return (
        <Dialog
            PaperComponent={() => <Typography className={classes.color} variant="h5">Loading...</Typography>}
            disableBackdropClick
            disableEscapeKeyDown
            open={show}
        />
    );
};
