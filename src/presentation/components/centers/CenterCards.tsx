import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@material-ui/core';

import { ICenter } from 'src/domain/interfaces';

const useStyles = makeStyles({
    container: {
        marginTop: '80px',
        height: 'calc(100vh - 80px)',
        overflow: 'auto',
    },
    root: {
        maxWidth: 290,
        margin: '10px auto',
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        backgroundSize: 'contain',
        height: 160,
    },
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid 2196F3'
        }
    }
});

const CenterCards = ({ centers = [] }: any) => {

    const classes = useStyles();

    return (
        <Grid container wrap={'wrap'} className={`${classes.container} ${classes.scrollBar}`}>
            {
                centers.map((center: ICenter) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={center.id}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={center.imageUrl}
                                title={center.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {center.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {center.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {center.address}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {`${center.city}, ${center.postalCode}`}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {center.province}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
};

export default CenterCards;